import express from 'express';
import { authRouter } from './authRoutes.ts';
export const v1Router = express.Router();

v1Router.use('/auth', authRouter);