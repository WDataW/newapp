import { prisma } from '#root/prisma/client.ts';
import { Unauthorized } from '#root/src/errors/Unauthorized.ts';
import type { AccessJWTOutput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { isFutureDate } from '#root/src/utils/date.ts';
import { extractBearer } from '#root/src/utils/extractBearer.ts';
import { signAccessJWT, verifyAccessJWT } from '#root/src/utils/jwt.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt = extractBearer(req);

    const payload: AccessJWTOutput = verifyAccessJWT(jwt);
    const userId = payload.sub;
    req.user = { userId }

    next();
}