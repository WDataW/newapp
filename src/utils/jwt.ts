import { JWT_SECRET } from '#root/src/config/environment.ts';
import type { RefreshJWTInput } from '#root/src/types/authTypes.ts';
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

export const verifyJWT = (token: string): Object => {
    return JWT.verify(token, JWT_SECRET);
}

export const signRefreshJWT = (payload: RefreshJWTInput): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn: 14 * day });
}
