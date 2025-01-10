// src/app/lib/db.js
import mysql from 'mysql2/promise';

// Configuração do pool de conexões
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sevenPlusDB',
});

// Testa a conexão
async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Conexão bem-sucedida! Teste retornou:', rows);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

testConnection();

// Exporta db como exportação padrão
export default db;
