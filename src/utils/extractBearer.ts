import { CustomError } from '#root/src/errors/CustomError.ts';
import type { Request } from 'express'
export const extractBearer = (req: Request): string => {
    if (!req.headers.authorization) throw new CustomError('No authorization header provided');
    return req.headers.authorization.replace('Bearer ', '');
}