"use strict";
// src/utils/jwt.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarToken = gerarToken;
exports.verificarToken = verificarToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = 'secreto-superseguro'; // Em produção, use variável de ambiente
function gerarToken(payload, expiraEm = '1h') {
    const options = {
        expiresIn: expiraEm,
    };
    return jsonwebtoken_1.default.sign(payload, SECRET, options);
}
function verificarToken(token) {
    return jsonwebtoken_1.default.verify(token, SECRET);
}
