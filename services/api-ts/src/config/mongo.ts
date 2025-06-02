// File: api-ts/src/config/mongo.ts
// Description: Configuração de conexão com o MongoDB usando Mongoose
// api-ts/src/config/mongo.ts

import mongoose from 'mongoose'; // Importa o Mongoose para manipulação do MongoDB

export async function connectToMongo(): Promise<void> {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/api_ts'; // Usa variável de ambiente ou valor padrão

  try {
    await mongoose.connect(mongoUri); // Conecta ao MongoDB com a URI definida
    console.log(`✅ Conectado ao MongoDB em: ${mongoUri}`); // Exibe mensagem de sucesso e a URI usada
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error); // Exibe mensagem de erro ao falhar na conexão
    process.exit(1); // Encerra o processo com código 1 em caso de erro
  }
}
