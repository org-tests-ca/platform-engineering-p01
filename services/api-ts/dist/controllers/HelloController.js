"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloController = void 0;
const HelloService_1 = require("../services/HelloService");
class HelloController {
    constructor() {
        this.service = new HelloService_1.HelloService();
    }
    saudacao(req, res) {
        const nome = req.params.nome || 'visitante';
        return res.json({ mensagem: this.service.saudacao(nome) });
    }
}
exports.HelloController = HelloController;
