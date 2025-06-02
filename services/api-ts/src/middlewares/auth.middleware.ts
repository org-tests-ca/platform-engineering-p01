// src/middlewares/auth.middleware.ts

import { RequestHandler } from 'express';
import { verificarToken } from '../utils/jwt';

export const autenticarJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ erro: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = verificarToken(token);
    (req as any).usuario = payload; // Pode ser ajustado futuramente com tipagem refinada
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
