// db.js
const mysql = require('mysql2/promise');  // Corrigido para 'mysql2/promise'

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'sevenPlusDB', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Função para testar a conexão
async function testarConexao() {
  try {
    // Realiza uma consulta simples para testar a conexão
    const [rows, fields] = await pool.query('SELECT 1');
    console.log('Conexão bem-sucedida!', rows);  // Resultado da consulta
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

// Chama a função para testar a conexão
testarConexao();

// Exportando o pool para ser usado em outras partes do código
module.exports = pool;
