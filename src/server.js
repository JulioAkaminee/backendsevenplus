require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Conexão com o banco de dados
const categoriasRouter = require('./routes/categorias')
const fimesRouter = require('./routes/filmes')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const forgotPasswordRouter = require('./routes/forgotPassword')

const app = express();
const port = 3000

// Middleware para o corpo da requisição (JSON)
app.use(express.json());

// Middleware de CORS para permitir requisições de diferentes origens
app.use(cors());

app.use(cors({
  origin: `http://localhost:${port}`, 
  methods: 'GET,POST',
}));

app.use('/api/categorias', categoriasRouter);
app.use('/api/filmes', fimesRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/forgotpassword', forgotPasswordRouter)

// Iniciar o servidor na porta 3010
app.listen(3010, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
