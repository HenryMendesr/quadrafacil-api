/** Agrega todas as rotas da API sob o prefixo /api. */

const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API running!' });
});

module.exports = router;
