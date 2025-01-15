
const express = require('express');
const router = express.Router();
const db = require('../db');  


router.get('/', (req, res) => {
 
    res.status(200).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API de Gerenciamento de Filmes e Autenticação de Usuários</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #4CAF50;
            margin-top: 30px;
        }
        code {
            display: block;
            background-color: #f5f5f5;
            border-radius: 5px;
            padding: 10px;
            font-size: 14px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            font-size: 14px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        ul {
            margin-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        .response {
            font-style: italic;
            color: #555;
        }
        .endpoint {
            background-color: #e7f4e4;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <header>
        <h1>API de Gerenciamento de Filmes e Autenticação de Usuários</h1>
    </header>
    <div class="container">
        <h2>Funcionalidades</h2>
        <ul>
            <li>Cadastro e autenticação de usuários.</li>
            <li>Cadastro e listagem de filmes.</li>
            <li>Recuperação de senha via e-mail.</li>
            <li>Alteração de senha.</li>
        </ul>

        <h2>Tecnologias Usadas</h2>
        <ul>
            <li><strong>Node.js</strong> e <strong>Express.js</strong> para a construção da API.</li>
            <li><strong>MySQL</strong> para o banco de dados.</li>
            <li><strong>Bcrypt</strong> para criptografia de senhas.</li>
            <li><strong>Nodemailer</strong> para envio de e-mails.</li>
        </ul>

        <h2>Endpoints da API</h2>

        <div class="endpoint">
            <h3>1. Cadastro de Usuário</h3>
            <p><strong>Método</strong>: POST</p>
            <p><strong>Endpoint</strong>: /users</p>
            <p><strong>Descrição</strong>: Registra um novo usuário.</p>
            <p><strong>Body (JSON)</strong>:</p>
            <pre><code>{
  "nome": "Nome do usuário",
  "email": "Email do usuário",
  "senha": "Senha do usuário",
  "fotoUrl": "URL da foto do usuário"
}</code></pre>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>201 Created</strong>: Usuário registrado com sucesso.</li>
                <li><strong>400 Bad Request</strong>: Campos obrigatórios não preenchidos.</li>
                <li><strong>409 Conflict</strong>: Usuário já existe.</li>
                <li><strong>500 Internal Server Error</strong>: Erro ao registrar o usuário.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>2. Login de Usuário</h3>
            <p><strong>Método</strong>: POST</p>
            <p><strong>Endpoint</strong>: /login</p>
            <p><strong>Descrição</strong>: Realiza o login de um usuário.</p>
            <p><strong>Body (JSON)</strong>:</p>
            <pre><code>{
  "email": "Email do usuário",
  "senha": "Senha do usuário"
}</code></pre>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>200 OK</strong>: Login realizado com sucesso.</li>
                <li><strong>400 Bad Request</strong>: Campos obrigatórios não preenchidos.</li>
                <li><strong>401 Unauthorized</strong>: Senha incorreta.</li>
                <li><strong>404 Not Found</strong>: Usuário não encontrado.</li>
                <li><strong>500 Internal Server Error</strong>: Erro no servidor.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>3. Recuperação de Senha (Enviar link)</h3>
            <p><strong>Método</strong>: POST</p>
            <p><strong>Endpoint</strong>: /forgotpassword</p>
            <p><strong>Descrição</strong>: Envia um link para redefinir a senha do usuário.</p>
            <p><strong>Body (JSON)</strong>:</p>
            <pre><code>{
  "email": "Email do usuário"
}</code></pre>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>200 OK</strong>: E-mail com o link de recuperação enviado com sucesso.</li>
                <li><strong>400 Bad Request</strong>: E-mail não fornecido.</li>
                <li><strong>404 Not Found</strong>: Usuário não encontrado.</li>
                <li><strong>500 Internal Server Error</strong>: Erro ao enviar o e-mail.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>4. Formulário de Redefinição de Senha</h3>
            <p><strong>Método</strong>: GET</p>
            <p><strong>Endpoint</strong>: /forgotpassword</p>
            <p><strong>Descrição</strong>: Exibe o formulário de redefinição de senha.</p>
            <p><strong>Query Parameters:</strong> Email: E-mail do usuário que solicitou a redefinição de senha.</p>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>200 OK</strong>: Retorna o formulário HTML para o usuário redefinir sua senha.</li>
                <li><strong>400 Bad Request</strong>: E-mail não fornecido.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>5. Redefinir Senha</h3>
            <p><strong>Método</strong>: POST</p>
            <p><strong>Endpoint</strong>: /forgotpassword/reset-password</p>
            <p><strong>Descrição</strong>: Atualiza a senha do usuário no banco de dados.</p>
            <p><strong>Body (JSON)</strong>:</p>
            <pre><code>{
  "email": "Email do usuário",
  "newPassword": "Nova senha do usuário"
}</code></pre>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>200 OK</strong>: Senha atualizada com sucesso.</li>
                <li><strong>400 Bad Request</strong>: E-mail ou nova senha não fornecidos.</li>
                <li><strong>404 Not Found</strong>: Usuário não encontrado.</li>
                <li><strong>500 Internal Server Error</strong>: Erro ao redefinir a senha.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>6. Cadastro de Filmes</h3>
            <p><strong>Método</strong>: POST</p>
            <p><strong>Endpoint</strong>: /filmes</p>
            <p><strong>Descrição</strong>: Cadastra um novo filme.</p>
            <p><strong>Body (JSON)</strong>:</p>
            <pre><code>{
  "titulo": "Título do filme",
  "descricao": "Descrição do filme",
  "url_video": "URL do vídeo",
  "capa": "URL da capa do filme",
  "data_lancamento": "Data de lançamento do filme (YYYY-MM-DD)",
  "category_id": "ID da categoria do filme"
}</code></pre>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>201 Created</strong>: Filme cadastrado com sucesso.</li>
                <li><strong>400 Bad Request</strong>: Campos obrigatórios não preenchidos.</li>
                <li><strong>500 Internal Server Error</strong>: Erro ao cadastrar o filme.</li>
            </ul>
        </div>

        <div class="endpoint">
            <h3>7. Listar Filmes</h3>
            <p><strong>Método</strong>: GET</p>
            <p><strong>Endpoint</strong>: /filmes</p>
            <p><strong>Descrição</strong>: Lista todos os filmes.</p>
            <p><strong>Respostas:</strong></p>
            <ul>
                <li><strong>200 OK</strong>: Retorna uma lista de filmes cadastrados.</li>
                <li><strong>404 Not Found</strong>: Nenhum filme encontrado.</li>
                <li><strong>500 Internal Server Error</strong>: Erro ao buscar filmes.</li>
            </ul>
        </div>
    </div>
</body>
</html>
`);

});


module.exports = router;
