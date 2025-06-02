// src/controllers/auth.controller.ts

import { RequestHandler } from 'express';
import { gerarToken } from '../utils/jwt';

export const login: RequestHandler = async (req, res) => {
  // Apenas para simulação (mock). Em produção, validar credenciais.
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ erro: 'Email é obrigatório' });
    return;
  }

  const token = gerarToken({ email });
  res.status(200).json({ token });
};
