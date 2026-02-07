/**
 * ====================================
 * ARQUIVO: models/Message.js
 * ====================================
 * Define o esquema (schema) de mensagens no MongoDB
 * 
 * FUNÇÕES PRINCIPAIS:
 * - Define a estrutura dos dados de mensagens
 * - Validações de campos obrigatórios
 * - Timestamps automáticos (criação e atualização)
 * 
 * CAMPOS DO SCHEMA:
 * - name: String - Nome do remetente (obrigatório)
 * - email: String - Email do remetente (obrigatório, deve ser válido)
 * - message: String - Conteúdo da mensagem (obrigatório)
 * - createdAt: Date - Data de criação (automático)
 * - updatedAt: Date - Data de atualização (automático)
 */

import mongoose from 'mongoose';

/**
 * Schema para mensagens de contato
 * Define a estrutura de como os dados serão armazenados no MongoDB
 */
const messageSchema = new mongoose.Schema(
    {
        // Nome do remetente
        name: {
            type: String,
            required: true, // Campo obrigatório
            trim: true, // Remove espaços antes e depois
            minlength: 3, // Mínimo de 3 caracteres
            maxlength: 100 // Máximo de 100 caracteres
        },

        // Email do remetente
        email: {
            type: String,
            required: true, // Campo obrigatório
            match: /.+\@.+\..+/, // Validação básica de email
            lowercase: true // Armazena sempre em minúsculas
        },

        // Mensagem/conteúdo
        message: {
            type: String,
            required: true, // Campo obrigatório
            minlength: 5, // Mínimo de 5 caracteres
            maxlength: 5000 // Máximo de 5000 caracteres
        }
    },
    {
        timestamps: true // Adiciona automaticamente createdAt e updatedAt
    }
);

/**
 * Modelo de Message
 * Cria uma coleção "messages" no MongoDB
 */
const Message = mongoose.model('Message', messageSchema);

export default Message;
