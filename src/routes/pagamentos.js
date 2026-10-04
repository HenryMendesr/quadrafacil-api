/** Rotas de pagamentos: processamento simulado de cobrança. */

const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');

const router = express.Router();

router.post('/', pagamentoController.processarPagamento);

module.exports = router;
