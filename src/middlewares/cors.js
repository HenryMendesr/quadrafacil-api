/**
 * Configuração de CORS da API, liberando apenas a origem do frontend
 * definida em CORS_ORIGIN (.env).
 */

const cors = require('cors');

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
});

module.exports = corsMiddleware;
