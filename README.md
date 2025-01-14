# API de Gerenciamento de Filmes e Autenticação de Usuários

Esta API foi desenvolvida com Express.js para gerenciar filmes, autenticar usuários e realizar a recuperação de senhas.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Cadastro e listagem de filmes.
- Recuperação de senha via e-mail.
- Alteração de senha.

## Tecnologias Usadas

- **Node.js** e **Express.js** para a construção da API.
- **MySQL** para o banco de dados.
- **Bcrypt** para criptografia de senhas.
- **Nodemailer** para envio de e-mails.

## Endpoints da API

### 1. Cadastro de Usuário

**Método**: `POST`  
**Endpoint**: `/users`  
**Descrição**: Registra um novo usuário.

**Body (JSON)**:
```json
{
  "nome": "Nome do usuário",
  "email": "Email do usuário",
  "senha": "Senha do usuário",
  "fotoUrl": "URL da foto do usuário"
}
````

**Respostas:**<br>

201 Created: Usuário registrado com sucesso.<br>
400 Bad Request: Campos obrigatórios não preenchidos. <br>
409 Conflict: Usuário já existe. <br>
500 Internal Server Error: Erro ao registrar o usuário. <br>

### 2. Login de Usuário
**Método**: `POST`  
**Endpoint**: `/login`  
**Descrição**: Realiza o login de um usuário.

**Body (JSON)**:
```json
{
  "email": "Email do usuário",
  "senha": "Senha do usuário"
}

````

**Respostas:**<br>

200 OK: Login realizado com sucesso.<br>
400 Bad Request: Campos obrigatórios não preenchidos.<br>
401 Unauthorized: Senha incorreta.<br>
404 Not Found: Usuário não encontrado.<br>
500 Internal Server Error: Erro no servidor.<br>

### 3. Recuperação de Senha (Enviar link)
**Método**: `POST`  
**Endpoint**: `/forgotpassword`  
**Descrição**: Envia um link para redefinir a senha do usuário.

**Body (JSON)**:
```json
{
  "email": "Email do usuário"
}
````

**Respostas:**<br>

200 OK: E-mail com o link de recuperação enviado com sucesso.<br>
400 Bad Request: E-mail não fornecido.<br>
404 Not Found: Usuário não encontrado.<br>
500 Internal Server Error: Erro ao enviar o e-mail.<br>


### 4. Formulário de Redefinição de Senha
**Método**: `GET`  
**Endpoint**: `/forgotpassword`  
**Descrição**: Exibe o formulário de redefinição de senha.


**Respostas:**<br>

**Query Parameters:**

- Email: E-mail do usuário que solicitou a redefinição de senha.

200 OK: Retorna o formulário HTML para o usuário redefinir sua senha.<br>
400 Bad Request: E-mail não fornecido.


### 5. Redefinir Senha
**Método**: `POST`  
**Endpoint**: `/forgotpassword/reset-password`  
**Descrição**: Atualiza a senha do usuário no banco de dados.

**Body (JSON)**:
```json
{
  "email": "Email do usuário",
  "newPassword": "Nova senha do usuário"
}
````

**Respostas:**<br>

200 OK: Senha atualizada com sucesso.<br>
400 Bad Request: E-mail ou nova senha não fornecidos.<br>
404 Not Found: Usuário não encontrado.<br>
500 Internal Server Error: Erro ao redefinir a senha.<br>

### 6. Cadastro de filmes
**Método**: `POST`  
**Endpoint**: `/filmes`  
**Descrição**: Cadastra um novo filme.

**Body (JSON)**:
```json
{
  "titulo": "Título do filme",
  "descricao": "Descrição do filme",
  "url_video": "URL do vídeo",
  "capa": "URL da capa do filme",
  "data_lancamento": "Data de lançamento do filme (YYYY-MM-DD)",
  "category_id": "ID da categoria do filme"
}
````

**Respostas:**<br>

201 Created: Filme cadastrado com sucesso.<br>
400 Bad Request: Campos obrigatórios não preenchidos.<br>
500 Internal Server Error: Erro ao cadastrar o filme.<br>

### 6. Listar Filmes
**Método**: `GET`  
**Endpoint**: `/filmes`  
**Descrição**: Lista todos os filmes

**Respostas:**<br>

200 OK: Retorna uma lista de filmes cadastrados.<br>
404 Not Found: Nenhum filme encontrado.<br>
500 Internal Server Error: Erro ao buscar filmes.<br>



