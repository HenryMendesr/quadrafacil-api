/**
 * Regras de negócio relacionadas a reservas: validação, checagem de
 * conflito de horário, criação, listagem e cancelamento.
 */

const { reservas, gerarProximoIdReserva } = require('../data/mockData');
const { buscarQuadraPorId } = require('./quadraService');

const REGEX_DATA = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_HORARIO = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Lista reservas, opcionalmente filtradas por quadra.
 * @param {object} filtros
 * @param {string|number} [filtros.quadraId]
 * @returns {object[]}
 */
function listarReservas(filtros = {}) {
  const { quadraId } = filtros;
  if (!quadraId) return reservas;
  return reservas.filter((reserva) => reserva.quadraId === Number(quadraId));
}

/**
 * Valida os campos obrigatórios de uma solicitação de reserva.
 * @param {object} dadosReserva
 * @returns {string[]} Lista de mensagens de erro (vazia se tudo for válido).
 */
function validarDadosDeReserva(dadosReserva) {
  const erros = [];
  const { quadraId, nomeCliente, telefoneCliente, data, horario } = dadosReserva;

  if (!quadraId) erros.push('O campo "quadraId" é obrigatório.');
  else if (!buscarQuadraPorId(quadraId)) erros.push('Quadra informada não foi encontrada.');

  if (!nomeCliente || !String(nomeCliente).trim()) {
    erros.push('O campo "nomeCliente" é obrigatório.');
  }
  if (!telefoneCliente || !String(telefoneCliente).trim()) {
    erros.push('O campo "telefoneCliente" é obrigatório.');
  }
  if (!data || !REGEX_DATA.test(data)) {
    erros.push('O campo "data" é obrigatório e deve estar no formato AAAA-MM-DD.');
  }
  if (!horario || !REGEX_HORARIO.test(horario)) {
    erros.push('O campo "horario" é obrigatório e deve estar no formato HH:mm.');
  }

  return erros;
}

/**
 * Verifica se já existe reserva ativa (pendente ou confirmada) para a
 * mesma quadra, data e horário.
 * @param {number} quadraId
 * @param {string} data
 * @param {string} horario
 * @returns {boolean}
 */
function existeConflitoDeHorario(quadraId, data, horario) {
  return reservas.some(
    (reserva) =>
      reserva.quadraId === Number(quadraId) &&
      reserva.data === data &&
      reserva.horario === horario &&
      reserva.status !== 'cancelada'
  );
}

/**
 * Cria uma nova reserva com status inicial "pendente".
 * @param {object} dadosReserva
 * @returns {object} A reserva criada.
 */
function criarReserva(dadosReserva) {
  const novaReserva = {
    id: gerarProximoIdReserva(),
    quadraId: Number(dadosReserva.quadraId),
    nomeCliente: dadosReserva.nomeCliente,
    telefoneCliente: dadosReserva.telefoneCliente,
    data: dadosReserva.data,
    horario: dadosReserva.horario,
    status: 'pendente',
    criadaEm: new Date().toISOString(),
  };

  reservas.push(novaReserva);
  return novaReserva;
}

/**
 * Busca uma reserva pelo id.
 * @param {number} reservaId
 * @returns {object|undefined}
 */
function buscarReservaPorId(reservaId) {
  return reservas.find((reserva) => reserva.id === Number(reservaId));
}

/**
 * Cancela uma reserva, liberando o horário correspondente.
 * @param {number} reservaId
 * @returns {object|null} A reserva cancelada, ou null se não encontrada.
 */
function cancelarReserva(reservaId) {
  const reserva = buscarReservaPorId(reservaId);
  if (!reserva) return null;

  reserva.status = 'cancelada';
  return reserva;
}

/**
 * Confirma uma reserva após o pagamento ser aprovado.
 * @param {number} reservaId
 * @returns {object|null} A reserva confirmada, ou null se não encontrada.
 */
function confirmarReserva(reservaId) {
  const reserva = buscarReservaPorId(reservaId);
  if (!reserva) return null;

  reserva.status = 'confirmada';
  return reserva;
}

module.exports = {
  listarReservas,
  validarDadosDeReserva,
  existeConflitoDeHorario,
  criarReserva,
  buscarReservaPorId,
  cancelarReserva,
  confirmarReserva,
};
