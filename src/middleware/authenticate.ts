import { extractBearer } from '#root/src/utils/extractBearer.ts';
import type { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = extractBearer(req);
    next();
}