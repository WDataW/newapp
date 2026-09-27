import { JWT_SECRET } from '#root/src/config/environment.ts';
import { default as JWT } from 'jsonwebtoken';
export const signJWT = (payload: Object, { expiresIn }: { expiresIn: number }): string => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn });
}

export const verifyJWT = (token: string): Object => {
    return JWT.verify(token, JWT_SECRET);
}