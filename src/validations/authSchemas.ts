import { emailValidator, passwordValdiator, tokenValidator } from '#root/src/validations/credintialsValidators.ts';
import * as zod from 'zod';

export const loginSchema = zod.object({
    email: emailValidator,
    password: passwordValdiator
})
export const resetPasswordSchema = zod.object({
    email: emailValidator,
    resetToken: tokenValidator,
    newPassword: passwordValdiator
})
export const verifyEmailSchema = zod.object({
    email: emailValidator,
    tokenValidator: tokenValidator
})

export const registerSchema = zod.object({
    email: emailValidator,
    password: passwordValdiator,
    username: zod.string().min(3).max(20)
})

export const refreshTokenSchema = zod.object({
    refreshToken: zod.string().regex(/^(?:[\w-]*\.){2}[\w-]*$/)
})

export const refreshJWTPayloadSchema = zod.object({
    sub: zod.uuid(),
    jti: zod.uuid(),
    tokenVersion: zod.number().int().nonnegative(),
    exp: zod.number(),
    iat: zod.number(),
});
export const accessJWTPayloadSchema = zod.object({
    sub: zod.uuid(),
    exp: zod.number(),
    iat: zod.number(),
});