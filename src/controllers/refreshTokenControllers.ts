import type { Request, Response } from 'express'
import { signRefreshJWT } from '#root/src/utils/jwt.ts';
import type { refreshJWTPayload } from '#root/src/types/authTypes.ts';
import { JWT_SECRET } from '#root/src/config/environment.ts';
import { prisma } from '#root/prisma/client.ts';
import { day } from '#root/src/utils/time.ts';
import { getFutureDate } from '#root/src/utils/date.ts';
import type { User } from '#root/generated/prisma/client.ts';
export const issueRefreshToken = async (user: User) => {
    const refreshToken = await prisma.refreshToken.create({
        data: {
            userId: user.id,
            expiresAt: getFutureDate(15),
        }
    })
    return refreshToken;
}
export const attachRefreshToken = async (res: Response, user: User) => {
    const DBRefreshToken = await issueRefreshToken(user);

    const refreshPayload: refreshJWTPayload = {
        sub: DBRefreshToken.userId,
        jti: DBRefreshToken.id,
        tokenVersion: user.tokenVersion,
    }
    const refreshToken = signRefreshJWT(refreshPayload);
    return res.setHeader('X-Refresh-Token', refreshToken);
}