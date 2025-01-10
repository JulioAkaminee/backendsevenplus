// routes/categorias.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importando a conexão com o banco de dados

// Rota GET para obter categorias
router.get('/', async (req, res) => {
  res.send("hello")
  const queryCategorias = "SELECT * FROM categories";  // Consulta SQL

  try {
    // Realiza a consulta no banco de dados utilizando Promise
    const [result] = await db.query(queryCategorias);  // Aqui, `db.query` retorna uma Promise
    res.json(result);  // Retorna os resultados no formato JSON
  } catch (err) {
    // Em caso de erro, retorna status 500 com a mensagem de erro
    console.error('Erro ao buscar categorias:', err);
    res.status(500).send({ error: "Erro interno ao buscar categorias" });
  }
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
