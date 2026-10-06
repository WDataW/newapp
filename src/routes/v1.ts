import express from 'express';
import { authRouter } from './authRoutes.ts';
import { accountRouter } from '#root/src/routes/accountRoutes.ts';
export const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/account', accountRouter);