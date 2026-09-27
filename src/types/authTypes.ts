import type { refreshJWTPayloadSchema } from '#root/src/validations/authSchemas.ts';
import { default as zod } from 'zod';

export interface RefreshJWTInput {
    sub: string,
    jti: string,
    tokenVersion: number
};
export type RefreshJWTOutput = zod.infer<typeof refreshJWTPayloadSchema>;

