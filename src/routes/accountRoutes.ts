import { deleteAccount, undeleteAccount } from '#root/src/controllers/account/accountControllers.ts';
import { authenticate } from '#root/src/middleware/authenticate.ts';
import express from 'express';
export const accountRouter = express.Router()

accountRouter.post('/delete-account', authenticate, deleteAccount);
accountRouter.post('/undelete-account', undeleteAccount);