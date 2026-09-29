import { prisma } from '#root/prisma/client.ts';
import { Unauthorized } from '#root/src/errors/Unauthorized.ts';
import type { AccessJWTOutput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { isFutureDate } from '#root/src/utils/date.ts';
import { extractBearer } from '#root/src/utils/extractBearer.ts';
import { signAccessJWT, verifyJWT } from '#root/src/utils/jwt.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt = extractBearer(req);

    const payload: AccessJWTOutput | RefreshJWTOutput = verifyJWT(jwt);
    const userId = payload.sub;
    if (payload.type == 'refresh') {
        const actualRefreshToken = await prisma.refreshToken.findUnique({
            where: {
                id: payload.jti
            }
        });
        if (!actualRefreshToken) throw new Unauthorized('Invalid Refresh Token, please login again');
        if (payload.tokenVersion !== actualRefreshToken.tokenVersion) throw new Unauthorized('Invalid Refresh Token, please login again');
        if (!isFutureDate(actualRefreshToken.expiresAt)) throw new Unauthorized('Expired Refresh Token, please login again');

        const newAccessToken = signAccessJWT({ sub: userId });
        res.setHeader('X-Access-Token', newAccessToken);
    }// else it is 'access' so just let it the request go through
    req.user = { userId }
    console.log(req.user);

    next();
}