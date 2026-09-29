import { extractBearer } from '#root/src/utils/extractBearer.ts';
import { verifyJWT } from '#root/src/utils/jwt.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwt = extractBearer(req);
    // determine if token is refresh or access
    const payload = verifyJWT(jwt);
    // if refresh let it go through and attach access to headers
    // if access let it go through
    next();
}