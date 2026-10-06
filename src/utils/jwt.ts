import { JWT_SECRET } from '#root/src/config/environment.ts';
import Unauthorized from '#root/src/errors/Unauthorized.ts';
import type { AccessJWTInput, AccessJWTOutput, RefreshJWTInput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { accessJWTPayloadSchema, refreshJWTPayloadSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import { default as JWT } from 'jsonwebtoken';

export const signJWT = (payload: Object, { expiresIn }: { expiresIn: number }): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn });
}

export const verifyAccessJWT = (token: string): AccessJWTOutput => {
    let payload
    try {
        payload = JWT.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Unauthorized('Invalid JWT');
    }
    return validate(accessJWTPayloadSchema, payload) as AccessJWTOutput;
}
export const verifyRefreshJWT = (token: string): RefreshJWTOutput => {
    let payload;
    try {
        payload = JWT.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Unauthorized('Invalid JWT');
    }
    return validate(refreshJWTPayloadSchema, payload) as RefreshJWTOutput;
}

export const signRefreshJWT = (payload: RefreshJWTInput): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn: '14d' });
}

export const signAccessJWT = (payload: AccessJWTInput): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}
