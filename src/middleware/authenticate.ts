import { extractBearer } from '#root/src/utils/extractBearer.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = extractBearer(req);
    // determine if token is refresh or access
    // if refresh let it go through and attach access to headers
    // if access let it go through
    next();
}