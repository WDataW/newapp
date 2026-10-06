import { deleteAccount } from '#root/src/controllers/account/accountControllers.ts';
import express from 'express';
export const accountRouter = express.Router()

accountRouter.post('/delete-account', deleteAccount)