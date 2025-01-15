const express = require("express");
const bcrypt = require('bcryptjs');
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
    const { nome, email, senha, fotoUrl  } = req.body;

    // Validação básica dos campos
    if (!nome || !email || !senha || !fotoUrl) {
        return res.status(400).json({ error: "Preencha todos os campos." });
    }

    try {
        // Verifica se o usuário já existe no banco de dados
        const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({ error: "Usuário já existe." });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere o novo usuário no banco de dados
        await db.query("INSERT INTO users (nome, email, senha, fotoUrl) VALUES (?, ?, ?,?)", [
            nome,
            email,
            hashedPassword,
            fotoUrl
        ]);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        return res.status(500).json({ error: "Erro interno ao registrar usuário." });
    }
});

module.exports = router;
