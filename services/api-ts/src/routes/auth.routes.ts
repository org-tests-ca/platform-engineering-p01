// src/routes/auth.routes.ts

import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', login); // login deve ser do tipo RequestHandler

export { authRouter };
