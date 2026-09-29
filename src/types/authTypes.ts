import type { accessJWTPayloadSchema, refreshJWTPayloadSchema } from '#root/src/validations/authSchemas.ts';
import { default as zod } from 'zod';

import type { JwtPayload } from 'jsonwebtoken';
export type JwtInitalOutput = JwtPayload & {
    type: string
}
export interface RefreshJWTInput {
    sub: string,
    jti: string,
    tokenVersion: number
};
export interface AccessJWTInput {
    sub: string,
    tokenVersion: number
};
export type RefreshJWTOutput = zod.infer<typeof refreshJWTPayloadSchema>;
export type AccessJWTOutput = zod.infer<typeof accessJWTPayloadSchema>;