import { passwordValdiator, token } from '#root/src/validations/credintialsSchemas.ts';
import * as zod from 'zod';

export const loginSchema = zod.object({
    email: zod.email(),
    password: passwordValdiator
})
export const resetPasswordSchema = zod.object({
    email: zod.email(),
    resetToken: token,
    newPassword: passwordValdiator
})
export const verifyEmailSchema = zod.object({
    email: zod.email(),
    token: token
})

export const registerSchema = zod.object({
    email: zod.email(),
    password: passwordValdiator
})

