import type { Response } from 'express'
import { signRefreshJWT } from '#root/src/utils/jwt.ts';
import { prisma } from '#root/prisma/client.ts';
import { getFutureDate } from '#root/src/utils/date.ts';
import type { User } from '#root/generated/prisma/client.ts';
import type { RefreshJWTInput } from '#root/src/types/authTypes.ts';
export const issueRefreshToken = async (user: User) => {
    const refreshToken = await prisma.refreshToken.create({
        data: {
            userId: user.id,
            expiresAt: getFutureDate(15),
            tokenVersion: user.tokenVersion,
        }
    })
    return refreshToken;
}
export const attachRefreshToken = async (res: Response, user: User) => {
    const DBRefreshToken = await issueRefreshToken(user);

    const refreshPayload: RefreshJWTInput = {
        sub: DBRefreshToken.userId,
        jti: DBRefreshToken.id,
        tokenVersion: user.tokenVersion,
    }
    const refreshToken = signRefreshJWT(refreshPayload);
    return res.setHeader('X-Refresh-Token', refreshToken);
}