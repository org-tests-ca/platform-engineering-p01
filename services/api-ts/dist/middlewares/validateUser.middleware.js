"use strict";
// src/middlewares/validateUser.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req, res, next) => {
    const { nome, email } = req.body;
    if (!nome || typeof nome !== 'string') {
        res.status(400).json({ erro: 'Nome é obrigatório e deve ser uma string' });
        return;
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ erro: 'Email inválido' });
        return;
    }
    next();
};
exports.validateUser = validateUser;
