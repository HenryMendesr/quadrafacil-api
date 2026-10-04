require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`QuadraFacil API rodando na porta ${PORT}`);
});
