import { JWT_SECRET } from '#root/src/config/environment.ts';
import { CustomError } from '#root/src/errors/CustomError.ts';
import type { AccessJWTInput, AccessJWTOutput, JwtInitalOutput, RefreshJWTInput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { day, minute } from '#root/src/utils/time.ts';
import { accessJWTPayloadSchema, refreshJWTPayloadSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import { default as JWT } from 'jsonwebtoken';
import { default as zod } from 'zod';

// keep here for reference
// interface authTokens {
//     access?: string,
//     refresh: string
// }

export const signJWT = (payload: Object, { expiresIn }: { expiresIn: number }): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn });
}

export const verifyJWT = (token: string): AccessJWTOutput | RefreshJWTOutput => {
    const payload = JWT.verify(token, JWT_SECRET) as JwtInitalOutput;
    if (payload.type == 'access') return validate(accessJWTPayloadSchema, payload) as AccessJWTOutput;
    if (payload.type !== 'refresh') throw new CustomError('Invalid Token');
    return validate(refreshJWTPayloadSchema, payload) as RefreshJWTOutput;
}

export const signRefreshJWT = (payload: RefreshJWTInput): string => {
    return JWT.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: '14d' });
}

export const signAccessJWT = (payload: AccessJWTInput): string => {
    return JWT.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: 5 });
}
