// server.js

const express = require('express');
const app = express();
const produtosRoutes = require('./routes/produtos');
const mercadosRoutes = require('./routes/mercados');
const produtoController = require('./routes/movimentacao');
const setupDatabase = require('./config/dbSetup');
const logger = require('./config/logger');

// Middleware para processar JSON
app.use(express.json());
// Verifica e cria o banco de dados e tabelas
setupDatabase();

// Rotas
app.use('/api/mercados', mercadosRoutes);
app.use('/api/mercados', produtosRoutes); 
app.use('/api/mercados', produtoController);

// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  logger.info(`Servidor rodando na porta ${PORT}`);
});
