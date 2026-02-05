// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer'); 
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o transporter do Nodemailer para Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Servidor SMTP para Outlook/Office 365 (CORRIGIDO: 365, não 3365)
    port: 587, // Porta padrão para TLS/STARTTLS
    secure: false, // Use 'false' para STARTTLS, que é a porta 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
});

// TESTE: rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor de contato está online!');
});

// Rota POST para receber os dados do formulário
app.post('/enviar-mensagem', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVING_EMAIL,
        subject: `Nova Mensagem do Site: ${name}`,
        html: `
            <h3>Detalhes da Mensagem:</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ message: 'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.' });
        }
        console.log('Mensagem enviada:', info.response);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Aguardando requisições POST em /enviar-mensagem`);
});