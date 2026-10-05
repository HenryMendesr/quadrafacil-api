/**
 * Controller de pagamentos: recebe a solicitação de cobrança, simula a
 * aprovação e confirma a reserva vinculada.
 */

const pagamentoService = require('../services/pagamentoService');
const reservaService = require('../services/reservaService');
const quadraService = require('../services/quadraService');

/**
 * POST /api/pagamentos
 * Recebe { reservaId, metodo }, simula a aprovação do pagamento, confirma
 * a reserva vinculada e retorna o pagamento criado.
 */
function processarPagamento(req, res) {
  const erros = pagamentoService.validarDadosDePagamento(req.body);
  if (erros.length > 0) {
    return res.status(400).json({ error: 'Dados inválidos.', detalhes: erros });
  }

  const { reservaId, metodo } = req.body;
  const reserva = reservaService.buscarReservaPorId(reservaId);
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva não encontrada.' });
  }

  if (reserva.status === 'cancelada') {
    return res.status(400).json({ error: 'Não é possível pagar uma reserva cancelada.' });
  }

  const pagamentoExistente = pagamentoService.buscarPagamentoPorReservaId(reservaId);
  if (pagamentoExistente) {
    return res.status(409).json({
      error: 'Esta reserva já possui um pagamento aprovado.',
      pagamentoId: pagamentoExistente.id,
    });
  }

  const quadra = quadraService.buscarQuadraPorId(reserva.quadraId);
  const resultadoPagamento = pagamentoService.simularAprovacaoDePagamento(metodo);

  if (!resultadoPagamento.aprovado) {
    return res.status(400).json({ error: 'Pagamento não aprovado.' });
  }

  const pagamentoCriado = pagamentoService.registrarPagamento({
    reservaId,
    metodo,
    valor: quadra ? quadra.precoHora : 0,
  });

  reservaService.confirmarReserva(reservaId);

  res.status(201).json(pagamentoCriado);
}

module.exports = {
  processarPagamento,
};
