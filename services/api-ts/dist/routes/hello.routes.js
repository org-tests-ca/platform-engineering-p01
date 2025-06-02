"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloRouter = void 0;
const express_1 = require("express");
const HelloController_1 = require("../controllers/HelloController");
const helloRouter = (0, express_1.Router)(); // cria um roteador para as rotas de saudação
exports.helloRouter = helloRouter;
const controller = new HelloController_1.HelloController(); // instancia o controlador de saudação
helloRouter.get("/", (req, res) => {
    res.json({ mensagem: "Estamso codando com Typescript" }); // Respondendo com um JSON contendo uma mensagem
});
helloRouter.get("/saudacao/:nome", (req, res) => {
    const nome = req.params.nome; // Obtendo o parâmetro nome da requisição
    res.json({ mensagem: `Olá, ${nome}!` }); // Respondendo com uma saudação personalizada em JSON
});
