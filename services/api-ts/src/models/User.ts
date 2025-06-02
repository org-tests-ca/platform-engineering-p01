import mongoose, { Schema, model } from 'mongoose'; // Importa mongoose, Schema e model do Mongoose para definir e manipular modelos de dados
import bcrypt from 'bcryptjs'; // Importa o bcrypt para criptografar senhas

const UserSchema = new Schema({ // Define o esquema do usuário
    nome: { type: String, required: true, unique: true }, // Nome do usuário, obrigatório e único
    email: { type: String, required: true, unique: true }, // Email do usuário, obrigatório e único
    senha: { type: String, required: true } // Senha do usuário, obrigatória
}, {
    timestamps: true // Adiciona timestamps para createdAt e updatedAt automaticamente
});

// Antes de salvar, faz o hash da senha
UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next(); // Se a senha não foi modificada, segue
    const hash = await bcrypt.hash(this.senha, 10); // Gera o hash da senha com salt 10
    this.senha = hash; // Substitui a senha original pelo hash
    next(); // Continua o fluxo
});

export const UserModel = model('User', UserSchema); // Cria e exporta o modelo User baseado no UserSchema
// O modelo UserModel pode ser usado para criar, ler, atualizar e excluir usuários no MongoDB
// Exemplo de uso:
// UserModel.create({ nome: 'João', email: 'joao@email.com', senha: '123456' })
