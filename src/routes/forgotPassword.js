
const express = require('express');
const db = require('../db.js');  // Conexão com o banco de dados
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const router = express.Router();

const email = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS


// Configuração do Nodemailer (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,  // Seu e-mail
      pass: pass,  // Sua senha de aplicativo
    },
    tls: {
      rejectUnauthorized: false, // Necessário para permitir a comunicação com servidores de e-mail
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log('Erro ao verificar o transporte:', error);
    } else {
      console.log('Transporte verificado com sucesso');
    }
  });
  
// Função para enviar e-mail (usando Promise para compatibilidade com async/await)
const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};

// Rota para solicitar recuperação de senha (sem usar token)
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: 'O campo e-mail é obrigatório.' });
  }

  try {
    // Verificar se o usuário existe
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(404).send({ error: 'Usuário não encontrado.' });
    }

    // Enviar um e-mail com instruções de recuperação de senha
    const resetLink = `http://localhost:3010/api/forgotpassword/reset-password?email=${email}`;
    await sendEmail(email, 'Recuperação de Senha', `Clique no link para redefinir sua senha: ${resetLink}`);

    return res.status(200).send({ message: 'E-mail enviado com sucesso.' });
  } catch (err) {
    console.error('Erro ao processar recuperação de senha:', err);
    return res.status(500).send({ error: 'Erro ao processar a solicitação.' });
  }
});

router.get('/reset-password', (req, res) => {
    const email = req.query.email; // Obtém o e-mail da query string
  
    if (!email) {
      return res.status(400).send('E-mail não fornecido.');
    }
  
    // Enviar o formulário HTML para redefinir a senha
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
  
            .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              width: 100%;
              max-width: 400px;
              text-align: center;
            }
  
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
  
            label {
              font-size: 14px;
              color: #555;
              margin-bottom: 8px;
              display: block;
            }
  
            input[type="password"] {
              width: 100%;
              padding: 10px;
              font-size: 16px;
              border: 1px solid #ddd;
              border-radius: 4px;
              margin-bottom: 20px;
            }
  
            button {
              background-color: #4CAF50;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              border-radius: 4px;
              cursor: pointer;
              width: 100%;
            }
  
            button:hover {
              background-color: #45a049;
            }
  
            #message {
              margin-top: 20px;
            }
  
            #message p {
              font-size: 14px;
            }
  
            #message p.green {
              color: green;
            }
  
            #message p.red {
              color: red;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Redefinir Senha</h2>
            <form id="resetPasswordForm">
              <input type="hidden" name="email" value="${email}" />
              <label for="newPassword">Nova Senha:</label>
              <input type="password" id="newPassword" name="newPassword" required />
              <button type="submit">Redefinir Senha</button>
            </form>
  
            <div id="message"></div> <!-- Aqui vamos mostrar a mensagem de sucesso ou erro -->
          </div>
  
          <script>
            document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
              event.preventDefault(); // Evita o recarregamento da página
  
              const formData = new FormData(this);
              const data = {};
              formData.forEach((value, key) => {
                data[key] = value;
              });
  
              // Enviar o formulário via fetch (AJAX)
              try {
                const response = await fetch('/api/forgotpassword/reset-password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
  
                const result = await response.json();
                
                // Mostrar a resposta na página
                const messageDiv = document.getElementById('message');
                if (response.ok) {
                  messageDiv.innerHTML = '<p class="green">' + result.message + '</p>';
                } else {
                  messageDiv.innerHTML = '<p class="red">' + result.error + '</p>';
                }
              } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
                const messageDiv = document.getElementById('message');
                messageDiv.innerHTML = '<p class="red">Erro ao enviar o formulário. Tente novamente.</p>';
              }
            });
          </script>
        </body>
      </html>
    `);
  });
  
  
// Rota para redefinir a senha (sem usar token)
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).send({ error: 'E-mail e nova senha são obrigatórios.' });
    }
    
  
    try {
      const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  
      if (user.length === 0) {
        return res.status(404).send({ error: 'Usuário não encontrado.' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await db.query('UPDATE users SET senha = ? WHERE email = ?', [hashedPassword, email]);
  
      return res.status(200).send({ message: 'Senha atualizada com sucesso.' });
    } catch (err) {
      console.error('Erro ao redefinir a senha:', err);
      return res.status(500).send({ error: 'Erro ao redefinir a senha.' });
    }
  });
module.exports = router;
