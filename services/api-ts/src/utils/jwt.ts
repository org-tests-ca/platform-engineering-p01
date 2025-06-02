// src/utils/jwt.ts

import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET: string = 'secreto-superseguro'; // Em produção, use variável de ambiente

export function gerarToken(payload: object, expiraEm: string = '1h'): string {
  const options: SignOptions = {
    expiresIn: expiraEm as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, SECRET, options);
}

export function verificarToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, SECRET);
}
