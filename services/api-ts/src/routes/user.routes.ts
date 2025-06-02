// src/routes/user.routes.ts

import { Router, Request, Response } from 'express';
import { UserModel } from '../models/User';
import { redisClient } from '../config/redis';
import { validateUser } from '../middlewares/validateUser.middleware';
import { logRequest } from '../middlewares/log.middleware';
import { autenticarJWT } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.use(logRequest);

userRouter.post('/', validateUser, async (req: Request, res: Response): Promise<void> => {
  try {
    await redisClient.del('users:all');
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: err });
  }
});

userRouter.get('/', autenticarJWT, async (_req: Request, res: Response): Promise<void> => {
  try {
    const cached = await redisClient.get('users:all');
    if (cached) {
      console.log('🟢 Redis: GET /users (cacheado)');
      res.json(JSON.parse(cached));
      return;
    }

    const users = await UserModel.find();
    await redisClient.set('users:all', JSON.stringify(users), { EX: 60 });
    console.log('🟡 MongoDB: GET /users (cache salvo)');
    res.json(users);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

userRouter.get('/:id', autenticarJWT, async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const cacheKey = `users:${id}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`🟢 Redis: GET /users/${id} (cacheado)`);
      res.json(JSON.parse(cached));
      return;
    }

    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }

    await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });
    console.log(`🟡 MongoDB: GET /users/${id} (cache salvo)`);
    res.json(user);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

userRouter.put('/:id', autenticarJWT, validateUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }

    await redisClient.del(`users:${req.params.id}`);
    await redisClient.del('users:all');

    res.json(user);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: err });
  }
});

userRouter.delete('/:id', autenticarJWT, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }

    await redisClient.del(`users:${req.params.id}`);
    await redisClient.del('users:all');

    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover usuário' });
  }
});

export { userRouter };
