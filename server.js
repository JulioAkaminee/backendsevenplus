// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Conexão com o banco de dados
const categoriasRouter = require('./routes/categorias')


const app = express();

// Middleware para o corpo da requisição (JSON)
app.use(express.json());

// Middleware de CORS para permitir requisições de diferentes origens
app.use(cors());


app.use('/api/categorias', categoriasRouter);

// Iniciar o servidor na porta 3010
app.listen(3010, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3010');
});
