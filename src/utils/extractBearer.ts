import Unauthorized from '#root/src/errors/Unauthorized.ts';
import type { Request } from 'express'
export const extractBearer = (req: Request): string => {
    if (!req.headers.authorization) throw new Unauthorized('No authorization header provided');
    return req.headers.authorization.replace('Bearer ', '');
}