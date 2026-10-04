/** Rotas de quadras: busca, detalhe, horários e cadastro. */

const express = require('express');
const quadraController = require('../controllers/quadraController');

const router = express.Router();

router.get('/', quadraController.listarQuadras);
router.post('/', quadraController.cadastrarQuadra);
router.get('/:id/horarios', quadraController.obterHorariosDaQuadra);
router.get('/:id', quadraController.obterQuadraPorId);

module.exports = router;
