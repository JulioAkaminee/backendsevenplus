require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Conexão com o banco de dados
const categoriasRouter = require('./routes/categorias')
const fimesRouter = require('./routes/filmes')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const forgotPasswordRouter = require('./routes/forgotPassword')
const homepageRouter = require('./routes/homepage')

const app = express();
const port = process.env.PORT_SERVER

// Middleware para o corpo da requisição (JSON)
app.use(express.json());


const corsOptions = {
  origin: ['https://backendsevenplus.vercel.app', `http://localhost:${port}`], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos permitidos
};

app.use(cors(corsOptions));


app.use('/',homepageRouter)
app.use('/api/categorias', categoriasRouter);
app.use('/api/filmes', fimesRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/forgotpassword', forgotPasswordRouter)

// Iniciar o servidor na porta 3010
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
