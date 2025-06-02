// src/middlewares/validateUser.middleware.ts

import { RequestHandler } from 'express';

export const validateUser: RequestHandler = (req, res, next) => {
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
