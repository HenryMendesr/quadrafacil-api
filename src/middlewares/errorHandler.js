/**
 * Middleware de tratamento de erros. Deve ser registrado por último em
 * app.js para capturar qualquer erro não tratado nas rotas/controllers.
 */

function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
