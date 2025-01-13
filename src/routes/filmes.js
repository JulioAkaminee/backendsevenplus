const express = require('express');
const db = require('../db.js');

const router = express.Router();

//Post para cadastro de usuarios
router.post('/', async (req, res) => {
    const { titulo, descricao, url_video, capa, data_lancamento, category_id } = req.body;

    if (!titulo || !descricao || !url_video || !capa || !data_lancamento || !category_id) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const sql = 'INSERT INTO movies (titulo, descricao, url_video, capa, data_lancamento, data_criacao, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(sql, [titulo, descricao, url_video, capa, data_lancamento, new Date(), category_id]);

        return res.status(201).send({ message: 'Filme cadastrado com sucesso!', filmeId: result.insertId });
    } catch (err) {
        console.error('Erro ao inserir filme:', err);
        return res.status(500).send({ error: 'Erro ao salvar o filme no banco de dados.' });
    }
});

router.get("/", async (req,res)=>{
    const queryFilmes = "SELECT * FROM movies";

    try {
        const [result] = await db.query(queryFilmes);
        if (result.length === 0) {
            return res.status(404).send({ message: "Nenhum filme encontrado" });
        }
        res.json(result)
    } catch (err) {
        console.error('Erro ao buscar filmes:', err);
        //caso tenha algum erro retorna o erro 500
        res.status(500).send({message: "erro interno ao buscar filmes"})
    }
})

module.exports = router;
