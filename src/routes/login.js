    const express = require("express");
    const bcrypt = require("bcrypt");
    const db = require("../db");

    const router = express.Router();

    router.post("/", async (req, res) => {
        const { email, senha } = req.body;
    
        // Validação básica dos campos
        if (!email || !senha) {
            return res.status(400).json({ error: "Preencha todos os campos." });
        }

        try {
            // Verifica se o usuário existe no banco de dados
            const [rows] = await db.query("SELECT id, nome, senha FROM users WHERE email = ?", [email]);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            const user = rows[0];

            // Verifica se a senha está correta
            const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "Senha incorreta." });
            }

            // Retorna uma mensagem de sucesso com as informações básicas do usuário
            return res.status(200).json({
                message: "Login realizado com sucesso.",
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: email,
                },
            });
        } catch (err) {
            console.error("Erro ao realizar login:", err);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    });

    module.exports = router;
