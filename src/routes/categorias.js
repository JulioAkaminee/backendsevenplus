
const express = require('express');
const router = express.Router();
const db = require('../db');  


router.get('/', async (req, res) => {
 
  const queryCategorias = "SELECT * FROM categories";  

  try {
    
    const [result] = await db.query(queryCategorias);  
    res.json(result);  // Retorna os resultados JSON
  } catch (err) {
    // caso tenha erro, retorna status 500 com a mensagem de erro
    console.error('Erro ao buscar categorias:', err);
    res.status(500).send({ error: "Erro interno ao buscar categorias" });
  }
});


module.exports = router;
