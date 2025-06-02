"use strict";
// File: api-ts/src/config/mongo.ts
// Description: Configuração de conexão com o MongoDB usando Mongoose
// api-ts/src/config/mongo.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = connectToMongo;
const mongoose_1 = __importDefault(require("mongoose")); // Importa o Mongoose para manipulação do MongoDB
async function connectToMongo() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/api_ts'; // Usa variável de ambiente ou valor padrão
    try {
        await mongoose_1.default.connect(mongoUri); // Conecta ao MongoDB com a URI definida
        console.log(`✅ Conectado ao MongoDB em: ${mongoUri}`); // Exibe mensagem de sucesso e a URI usada
    }
    catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error); // Exibe mensagem de erro ao falhar na conexão
        process.exit(1); // Encerra o processo com código 1 em caso de erro
    }
}
