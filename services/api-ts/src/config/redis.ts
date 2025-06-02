// File: src/config/redis.ts
// Description: Configuração de conexão com o Redis usando redis@^4.x (Node.js)

import { createClient } from 'redis';

// Lê variáveis de ambiente para construir a URL
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';
const redisUrl = `redis://${redisHost}:${redisPort}`;

// Cria o cliente Redis com a URL montada
export const redisClient = createClient({ url: redisUrl });

// Evento de erro para debug
redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error', err);
});

// Função para conectar ao Redis
export async function connectToRedis(): Promise<void> {
  try {
    await redisClient.connect();
    console.log(`✅ Conectado ao Redis em: ${redisUrl}`);
  } catch (err) {
    console.error('❌ Erro ao conectar no Redis:', err);
    process.exit(1);
  }
}
