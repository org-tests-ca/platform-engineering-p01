"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectToRedis = connectToRedis;
const redis_1 = require("redis"); // Importa a função createClient do pacote redis
exports.redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379'
});
exports.redisClient.on('error', (err) => console.error('❌ Redis Client Error', err)); // Registra um listener para erros do cliente Redis
async function connectToRedis() {
    try { // Tenta conectar ao Redis
        await exports.redisClient.connect(); // Conecta ao Redis
    }
    catch (err) { // Captura erros de conexão
        console.error('❌ Erro ao conectar no Redis:', err); // Exibe mensagem de erro ao falhar na conexão
        process.exit(1); // Encerra o processo com código 1 em caso de erro
    }
}
