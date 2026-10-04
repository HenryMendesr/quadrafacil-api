/** Agrega todas as rotas da API sob o prefixo /api. */

const express = require('express');
const quadrasRouter = require('./quadras');
const reservasRouter = require('./reservas');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API running!' });
});

router.use('/quadras', quadrasRouter);
router.use('/reservas', reservasRouter);

module.exports = router;
