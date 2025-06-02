"use strict";
// src/routes/user.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const redis_1 = require("../config/redis");
const validateUser_middleware_1 = require("../middlewares/validateUser.middleware");
const log_middleware_1 = require("../middlewares/log.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.use(log_middleware_1.logRequest);
userRouter.post('/', validateUser_middleware_1.validateUser, async (req, res) => {
    try {
        await redis_1.redisClient.del('users:all');
        const user = await User_1.UserModel.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: err });
    }
});
userRouter.get('/', auth_middleware_1.autenticarJWT, async (_req, res) => {
    try {
        const cached = await redis_1.redisClient.get('users:all');
        if (cached) {
            console.log('🟢 Redis: GET /users (cacheado)');
            res.json(JSON.parse(cached));
            return;
        }
        const users = await User_1.UserModel.find();
        await redis_1.redisClient.set('users:all', JSON.stringify(users), { EX: 60 });
        console.log('🟡 MongoDB: GET /users (cache salvo)');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
});
userRouter.get('/:id', auth_middleware_1.autenticarJWT, async (req, res) => {
    const id = req.params.id;
    const cacheKey = `users:${id}`;
    try {
        const cached = await redis_1.redisClient.get(cacheKey);
        if (cached) {
            console.log(`🟢 Redis: GET /users/${id} (cacheado)`);
            res.json(JSON.parse(cached));
            return;
        }
        const user = await User_1.UserModel.findById(id);
        if (!user) {
            res.status(404).json({ erro: 'Usuário não encontrado' });
            return;
        }
        await redis_1.redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });
        console.log(`🟡 MongoDB: GET /users/${id} (cache salvo)`);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ erro: 'ID inválido' });
    }
});
userRouter.put('/:id', auth_middleware_1.autenticarJWT, validateUser_middleware_1.validateUser, async (req, res) => {
    try {
        const user = await User_1.UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            res.status(404).json({ erro: 'Usuário não encontrado' });
            return;
        }
        await redis_1.redisClient.del(`users:${req.params.id}`);
        await redis_1.redisClient.del('users:all');
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: err });
    }
});
userRouter.delete('/:id', auth_middleware_1.autenticarJWT, async (req, res) => {
    try {
        const user = await User_1.UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ erro: 'Usuário não encontrado' });
            return;
        }
        await redis_1.redisClient.del(`users:${req.params.id}`);
        await redis_1.redisClient.del('users:all');
        res.json({ mensagem: 'Usuário removido com sucesso' });
    }
    catch (err) {
        res.status(400).json({ erro: 'Erro ao remover usuário' });
    }
});
