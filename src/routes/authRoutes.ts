import { login, register, requestResetPassword, resendVerificationEmail, resetPassword, showMe, verifyEmail } from '#root/src/controllers/authControllers.ts';
import { refreshAccessToken } from '#root/src/controllers/refreshTokenControllers.ts';
import { authenticate } from '#root/src/middleware/authenticate.ts';
import express from 'express';
export const authRouter = express.Router()

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/refresh', refreshAccessToken);
authRouter.post('/resend-verification-email', resendVerificationEmail);
authRouter.get('/verify-email', verifyEmail);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/forgot-password', requestResetPassword);

authRouter.get('/show-me', authenticate, showMe);
