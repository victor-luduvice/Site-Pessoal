/**
 * ====================================
 * ARQUIVO: utils/startMongoDB.js
 * ====================================
 * Utilitário para iniciar o MongoDB automaticamente
 * 
 * RESPONSABILIDADES:
 * - Verificar se o MongoDB já está rodando
 * - Iniciar o mongod se não estiver rodando
 * - Aguardar alguns segundos para garantir que iniciou
 */

import { spawn } from 'child_process';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Verifica se o MongoDB está rodando
 * @returns {boolean} - true se estiver rodando, false caso contrário
 */
function isMongoDBRunning() {
    try {
        // Tenta executar um comando que verifica se mongod está rodando
        execSync('tasklist | findstr mongod', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Inicia o MongoDB (mongod) em background
 * @returns {Promise<void>}
 */
async function startMongoDB() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            // Se já estiver rodando, não faz nada
            if (isMongoDBRunning()) {
                console.log('✅ MongoDB já está rodando!');
                resolve();
                return;
            }

            // Tenta encontrar o mongod em locais comuns no Windows
            const possiblePaths = [
                'C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe',
                'C:\\Program Files\\MongoDB\\Server\\6.0\\bin\\mongod.exe',
                'C:\\Program Files\\MongoDB\\Server\\5.0\\bin\\mongod.exe',
                'C:\\Program Files (x86)\\MongoDB\\Server\\7.0\\bin\\mongod.exe',
                'C:\\Program Files (x86)\\MongoDB\\Server\\6.0\\bin\\mongod.exe',
            ];

            let mongodPath = null;
            const fs = await import('fs').then(m => m.default);

            for (const pathToCheck of possiblePaths) {
                if (fs.existsSync(pathToCheck)) {
                    mongodPath = pathToCheck;
                    break;
                }
            }

            if (!mongodPath) {
                console.warn('⚠️  MongoDB não encontrado no sistema!');
                console.log('   Por favor, instale o MongoDB a partir de: https://www.mongodb.com/try/download/community');
                reject(new Error('MongoDB não encontrado'));
                return;
            }

            console.log(`🚀 Iniciando MongoDB de: ${mongodPath}`);

            // Inicia o mongod em background (desanexado do processo Node)
            const mongod = spawn(mongodPath, [], {
                detached: true,
                stdio: 'ignore'
            });

            // Permite que o Node.js termine sem aguardar o mongod
            mongod.unref();

            // Aguarda 3 segundos para o MongoDB iniciar
            console.log('⏳ Aguardando MongoDB iniciar...');
            setTimeout(() => {
                console.log('✅ MongoDB deve estar rodando agora!');
                resolve();
            }, 3000);

        } catch (error) {
            console.error('❌ Erro ao iniciar MongoDB:', error.message);
            reject(error);
        }
    });
}

export default startMongoDB;
