"use strict";
// src/controllers/auth.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_1 = require("../utils/jwt");
const login = async (req, res) => {
    // Apenas para simulação (mock). Em produção, validar credenciais.
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ erro: 'Email é obrigatório' });
        return;
    }
    const token = (0, jwt_1.gerarToken)({ email });
    res.status(200).json({ token });
};
exports.login = login;
