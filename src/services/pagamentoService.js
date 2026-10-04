/**
 * Camada de pagamentos.
 *
 * Nesta Semana 1 o pagamento é SIMULADO (mock): toda cobrança é aprovada
 * automaticamente. A função simularAprovacaoDePagamento é o único ponto
 * que precisa ser substituído por uma integração real (ex.: Mercado Pago,
 * Pix/cartão) no MVP — o restante da aplicação não precisa saber como o
 * pagamento foi processado, apenas se foi aprovado ou não.
 */

const { pagamentos, gerarProximoIdPagamento } = require('../data/mockData');

const METODOS_ACEITOS = ['pix', 'cartao'];

/**
 * Valida os dados de uma solicitação de pagamento.
 * @param {object} dadosPagamento
 * @returns {string[]} Lista de mensagens de erro (vazia se tudo for válido).
 */
function validarDadosDePagamento(dadosPagamento) {
  const erros = [];
  const { reservaId, metodo } = dadosPagamento;

  if (!reservaId) erros.push('O campo "reservaId" é obrigatório.');
  if (!metodo || !METODOS_ACEITOS.includes(metodo)) {
    erros.push('O campo "metodo" é obrigatório e deve ser "pix" ou "cartao".');
  }

  return erros;
}

/**
 * Simula a aprovação de um pagamento. Isolar esta função permite trocar a
 * simulação por uma chamada real ao Mercado Pago sem alterar o controller.
 * @param {string} metodo - "pix" ou "cartao".
 * @returns {{aprovado: boolean}} Resultado simulado da cobrança.
 */
function simularAprovacaoDePagamento(metodo) {
  return { aprovado: true, metodo };
}

/**
 * Registra o pagamento simulado vinculado a uma reserva.
 * @param {object} params
 * @param {number} params.reservaId
 * @param {string} params.metodo
 * @param {number} params.valor
 * @returns {object} O pagamento criado.
 */
function registrarPagamento({ reservaId, metodo, valor }) {
  const novoPagamento = {
    id: gerarProximoIdPagamento(),
    reservaId: Number(reservaId),
    metodo,
    valor,
    status: 'aprovado',
    criadaEm: new Date().toISOString(),
  };

  pagamentos.push(novoPagamento);
  return novoPagamento;
}

/**
 * Busca o pagamento vinculado a uma reserva.
 * @param {number} reservaId
 * @returns {object|undefined}
 */
function buscarPagamentoPorReservaId(reservaId) {
  return pagamentos.find((pagamento) => pagamento.reservaId === Number(reservaId));
}

module.exports = {
  METODOS_ACEITOS,
  validarDadosDePagamento,
  simularAprovacaoDePagamento,
  registrarPagamento,
  buscarPagamentoPorReservaId,
};
