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
    password: passwordValdiator,
    username: zod.string().min(3).max(20)
})

export const refreshJWTPayloadSchema = zod.object({
    sub: zod.uuid(),
    jti: zod.uuid(),
    tokenVersion: zod.number().int().nonnegative(),
    exp: zod.number(),
    iat: zod.number(),
    type: zod.enum(['refresh', 'access'])
});
export const accessJWTPayloadSchema = zod.object({
    sub: zod.uuid(),
    exp: zod.number(),
    iat: zod.number(),
    type: zod.enum(['refresh', 'access'])
});