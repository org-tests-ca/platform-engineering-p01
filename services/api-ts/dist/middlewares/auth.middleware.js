"use strict";
// src/middlewares/auth.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarJWT = void 0;
const jwt_1 = require("../utils/jwt");
const autenticarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ erro: 'Token não fornecido' });
        return;
    }
    const [, token] = authHeader.split(' ');
    try {
        const payload = (0, jwt_1.verificarToken)(token);
        req.usuario = payload; // Pode ser ajustado futuramente com tipagem refinada
        next();
    }
    catch {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
};
exports.autenticarJWT = autenticarJWT;
