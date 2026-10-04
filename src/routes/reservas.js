/** Rotas de reservas: listagem, criação e cancelamento. */

const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

router.get('/', reservaController.listarReservas);
router.post('/', reservaController.criarReserva);
router.patch('/:id/cancelar', reservaController.cancelarReserva);

module.exports = router;
