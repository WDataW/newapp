import { login, register } from '#root/src/controllers/authControllers.ts';
import express from 'express';
export const authRouter = express.Router()

authRouter.post('login', login)
authRouter.post('register', register)