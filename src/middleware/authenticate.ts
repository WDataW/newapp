import type { AccessJWTOutput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { extractBearer } from '#root/src/utils/extractBearer.ts';
import { verifyAccessJWT } from '#root/src/utils/jwt.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt = extractBearer(req);

    const payload: AccessJWTOutput = verifyAccessJWT(jwt);
    const id = payload.sub;
    req.user = { id }

    next();
}