"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose"); // Importa mongoose, Schema e model do Mongoose para definir e manipular modelos de dados
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Importa o bcrypt para criptografar senhas
const UserSchema = new mongoose_1.Schema({
    nome: { type: String, required: true, unique: true }, // Nome do usuário, obrigatório e único
    email: { type: String, required: true, unique: true }, // Email do usuário, obrigatório e único
    senha: { type: String, required: true } // Senha do usuário, obrigatória
}, {
    timestamps: true // Adiciona timestamps para createdAt e updatedAt automaticamente
});
// Antes de salvar, faz o hash da senha
UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha'))
        return next(); // Se a senha não foi modificada, segue
    const hash = await bcryptjs_1.default.hash(this.senha, 10); // Gera o hash da senha com salt 10
    this.senha = hash; // Substitui a senha original pelo hash
    next(); // Continua o fluxo
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema); // Cria e exporta o modelo User baseado no UserSchema
// O modelo UserModel pode ser usado para criar, ler, atualizar e excluir usuários no MongoDB
// Exemplo de uso:
// UserModel.create({ nome: 'João', email: 'joao@email.com', senha: '123456' })
