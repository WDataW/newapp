import { login, register, showMe } from '#root/src/controllers/authControllers.ts';
import { refreshAccessToken } from '#root/src/controllers/refreshTokenControllers.ts';
import { authenticate } from '#root/src/middleware/authenticate.ts';
import express from 'express';
export const authRouter = express.Router()

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/refresh', refreshAccessToken);

authRouter.get('/show-me', authenticate, showMe);
