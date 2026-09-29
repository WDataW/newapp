import { JWT_SECRET } from '#root/src/config/environment.ts';
import type { AccessJWTInput, AccessJWTOutput, JwtInitalOutput, RefreshJWTInput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { day, minute } from '#root/src/utils/time.ts';
import { default as JWT } from 'jsonwebtoken';

// keep here for reference
// interface authTokens {
//     access?: string,
//     refresh: string
// }

export const signJWT = (payload: Object, { expiresIn }: { expiresIn: number }): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn });
}

export const verifyJWT = (token: string): AccessJWTOutput | RefreshJWTOutput | null => {
    const payload = JWT.verify(token, JWT_SECRET) as JwtInitalOutput;
    if (payload.type == 'access') return payload as AccessJWTOutput;
    if (payload.type == 'refresh') return payload as RefreshJWTOutput;
    return null;
}

export const signRefreshJWT = (payload: RefreshJWTInput): string => {
    return JWT.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: 14 * day });
}

export const signAccessJWT = (payload: AccessJWTInput): string => {
    return JWT.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: 15 * minute });
}
