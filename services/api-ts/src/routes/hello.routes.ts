import { Router } from 'express';
import { HelloController } from '../controllers/HelloController';

const helloRouter = Router(); // cria um roteador para as rotas de saudação
const controller = new HelloController(); // instancia o controlador de saudação

import { Request, Response } from 'express'; // importa Request e Response do express

helloRouter.get("/", (req, res) => { // Definindo uma rota GET para o caminho raiz do helloRouter
    res.json({ mensagem: "Estamso codando com Typescript"}); // Respondendo com um JSON contendo uma mensagem
});

helloRouter.get("/saudacao/:nome", (req, res) => { // Definindo uma rota GET para saudacao com um parâmetro nome
    const nome = req.params.nome; // Obtendo o parâmetro nome da requisição
    res.json({ mensagem: `Olá, ${nome}!` }); // Respondendo com uma saudação personalizada em JSON
});

export { helloRouter }; // exportando o roteador helloRouter para ser usado em outros arquivos
