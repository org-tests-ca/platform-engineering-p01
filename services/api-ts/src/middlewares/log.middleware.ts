import { Request, Response, NextFunction } from 'express'; // Importa os tipos Request, Response e NextFunction do express

export function logRequest(req: Request, _res: Response, next: NextFunction) { // Define o middleware logRequest
  const now = new Date().toISOString(); // Obtém a data e hora atual em formato ISO 8601
  console.log(`[${now}] ${req.method} ${req.originalUrl}`); // Registra no console o método HTTP e a URL original da requisição
  next(); // Continua para o próximo middleware ou rota
}