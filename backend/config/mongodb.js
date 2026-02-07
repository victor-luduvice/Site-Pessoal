/**
 * ====================================
 * ARQUIVO: config/mongodb.js
 * ====================================
 * Responsável por gerenciar a conexão com o banco de dados MongoDB
 * 
 * FUNÇÕES PRINCIPAIS:
 * - Conectar ao banco de dados MongoDB usando Mongoose
 * - Tratamento de erros de conexão
 * - Logs de status da conexão
 * 
 * DEPENDÊNCIAS:
 * - mongoose: ODM para MongoDB
 * 
 * VARIÁVEIS DE AMBIENTE NECESSÁRIAS:
 * - MONGODB_URI: URL de conexão com o MongoDB (ex: mongodb://localhost:27017/site-pessoal)
 */

import mongoose from 'mongoose';

/**
 * Inicializa a conexão com o MongoDB
 * @returns {Promise<void>}
 */
const connectMongoDB = async () => {
    try {
        // URI de conexão vem da variável de ambiente
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/site-pessoal';

        // Conecta ao MongoDB com Mongoose
        await mongoose.connect(mongoUri);

        console.log('✅ Conectado ao MongoDB com sucesso!');
        console.log(`📌 Banco de dados: ${mongoUri}`);
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        
        // Se houver erro, tenta reconectar após 5 segundos
        console.log('🔄 Tentando reconectar em 5 segundos...');
        setTimeout(connectMongoDB, 5000);
    }
};

export default connectMongoDB;
