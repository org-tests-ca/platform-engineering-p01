"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = logRequest;
function logRequest(req, _res, next) {
    const now = new Date().toISOString(); // Obtém a data e hora atual em formato ISO 8601
    console.log(`[${now}] ${req.method} ${req.originalUrl}`); // Registra no console o método HTTP e a URL original da requisição
    next(); // Continua para o próximo middleware ou rota
}
