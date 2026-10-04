/**
 * Configuração de banco de dados.
 *
 * Nesta Semana 1 o projeto ainda NÃO usa um banco de dados real: todas as
 * quadras, reservas e pagamentos vivem em memória em src/data/mockData.js.
 * Este arquivo apenas lê a variável DATABASE_URL do .env e a expõe, para que
 * a conexão com o PostgreSQL seja plugada aqui no MVP (próxima etapa), sem
 * precisar alterar os controllers ou services que já consomem os dados mock.
 */

require('dotenv').config();

const databaseConfig = {
  url: process.env.DATABASE_URL || '',
  // TODO (MVP): instanciar o client/pool do PostgreSQL (ex.: pg.Pool) aqui
  // e substituir src/data/mockData.js pelas consultas reais.
};

module.exports = databaseConfig;
