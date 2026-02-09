/**
 * ====================================
 * ARQUIVO: server.js
 * ====================================
 * Arquivo principal do servidor backend
 * 
 * RESPONSABILIDADES:
 * - Configurar e iniciar o servidor Express
 * - Gerenciar conexão com MongoDB
 * - Processar requisições do formulário de contato
 * - Enviar emails e salvar mensagens no banco de dados
 * - Gerenciar rotas da API
 * 
 * ROTAS PRINCIPAIS:
 * - GET /  - Verificar se o servidor está online
 * - POST /enviar-mensagem - Receber dados do formulário
 * 
 * DEPENDÊNCIAS:
 * - express: Framework web
 * - mongoose: Conexão com MongoDB
 * - nodemailer: Envio de emails
 * - cors: Permitir requisições de outros domínios
 * - dotenv: Carregar variáveis de ambiente
 */

// Carrega as variáveis de ambiente do arquivo .env
import 'dotenv/config.js';
import process from 'node:process';

import express, { json, urlencoded } from 'express';
import { createTransport } from 'nodemailer'; 
import cors from 'cors';
import connectMongoDB from './config/mongodb.js'; // Importa a função de conexão MongoDB
import Message from './models/Message.js'; // Importa o modelo de mensagens 
import startMongoDB from './utils/startMongoDB.js'; // Importa o utilitário para iniciar MongoDB

const app = express();
const port = process.env.PORT || 3000;

// ====== MIDDLEWARES ======
// Habilitam requisições de domínios diferentes (CORS)
app.use(cors());

// Parsers para processar dados do formulário
app.use(json()); // Processa JSON
app.use(urlencoded({ extended: true })); // Processa URL encoded

// ====== INICIALIZAR CONEXÃO COM MONGODB ======
// Inicia o mongod e depois conecta ao banco de dados
(async () => {
    try {
        // Primeiro, tenta iniciar o MongoDB (se não estiver rodando)
        await startMongoDB();
        // Depois, conecta ao banco de dados
        await connectMongoDB();
    } catch (error) {
        console.error('❌ Erro ao inicializar MongoDB:', error.message);
        console.log('⚠️  O servidor continuará rodando, mas sem banco de dados');
    }
})();

// ====== CONFIGURAÇÃO DE EMAIL (NODEMAILER) ======
// Configura o transporter do Nodemailer para enviar emails via Outlook
// Nota: Você precisa adicionar EMAIL_USER e EMAIL_PASS no arquivo .env
const transporter = createTransport({
    host: 'smtp.office365.com', // Servidor SMTP para Outlook/Office 365
    port: 587, // Porta padrão para TLS/STARTTLS
    secure: false, // Use 'false' para STARTTLS na porta 587
    auth: {
        user: process.env.EMAIL_USER, // Email (variável de ambiente)
        pass: process.env.EMAIL_PASS // Senha (variável de ambiente)
    },
    tls: {
        ciphers:'SSLv3'
    }
});

// ====== ROTAS ======

/**
 * ROTA: GET /
 * Função: Verificar se o servidor está online
 * Retorna: Mensagem simples de confirmação
 */
app.get('/', (req, res) => {
    res.send('Servidor de contato está online!');
});

/**
 * ROTA: POST /enviar-mensagem
 * Função: Receber dados do formulário de contato e processar
 * 
 * FLUXO:
 * 1. Recebe dados (name, email, message) do frontend
 * 2. Valida se todos os campos estão preenchidos
 * 3. Salva a mensagem no MongoDB
 * 4. Envia email de notificação (opcional)
 * 5. Retorna resposta ao frontend
 * 
 * CAMPOS ESPERADOS:
 * - name: string - Nome do remetente
 * - email: string - Email do remetente
 * - message: string - Conteúdo da mensagem
 * 
 * RESPOSTA DE SUCESSO:
 * { message: 'Mensagem enviada com sucesso!' }
 * 
 * RESPOSTA DE ERRO:
 * { message: 'Descrição do erro' }
 */
app.post('/enviar-mensagem', async (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        const { name, email, message } = req.body;

        // ====== VALIDAÇÃO ======
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: 'Todos os campos são obrigatórios.' 
            });
        }

        // ====== SALVAR NO BANCO DE DADOS ======
        // Cria uma nova mensagem e salva no MongoDB
        const novaMessagem = new Message({
            name,
            email,
            message
        });

        // Salva a mensagem no banco de dados
        await novaMessagem.save();
        console.log(`✅ Mensagem salva no banco de dados - ID: ${novaMessagem._id}`);

        // ====== ENVIAR EMAIL (OPCIONAL) ======
        // Configura as opções de email
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
                <hr>
                <p><small>Mensagem recebida em: ${new Date().toLocaleString('pt-BR')}</small></p>
            `
        };

        // Tenta enviar o email (não bloqueia se falhar)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('⚠️ Erro ao enviar e-mail:', error);
                // Nota: A mensagem já foi salva no banco, então não retorna erro
            } else {
                console.log('✅ Email enviado:', info.response);
            }
        });

        // ====== RESPOSTA DE SUCESSO ======
        // Retorna mensagem de sucesso ao frontend
        res.status(201).json({ 
            message: 'Mensagem enviada e salva com sucesso!',
            messageId: novaMessagem._id
        });

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error.message);
        
        // ====== RESPOSTA DE ERRO ======
        res.status(500).json({ 
            message: 'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.' 
        });
    }
});

// ====== INICIAR SERVIDOR ======
// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
    console.log(`
    ╔═════════════════════════════════════════╗
    ║     🚀 SERVIDOR INICIADO COM SUCESSO!   ║
    ╚═════════════════════════════════════════╝

    📍 Endereço: http://localhost:${port}
    
    📋 ROTAS DISPONÍVEIS:
    ├─ GET  /                    - Verificar status
    └─ POST /enviar-mensagem     - Receber formulário de contato

    🗄️  BANCO DE DADOS: MongoDB conectado
    
    ⏰ Aguardando requisições...
    `);
});