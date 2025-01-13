
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Conexão com o banco de dados
const categoriasRouter = require('./routes/categorias')
const fimesRouter = require('./routes/filmes')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')


const app = express();

// Middleware para o corpo da requisição (JSON)
app.use(express.json());

// Middleware de CORS para permitir requisições de diferentes origens
app.use(cors());


app.use('/api/categorias', categoriasRouter);
app.use('/api/filmes', fimesRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)

// Iniciar o servidor na porta 3010
app.listen(3010, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:3010`);
});
