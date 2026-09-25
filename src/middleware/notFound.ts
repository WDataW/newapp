import { StatusCodes } from 'http-status-codes';
import type { Request, Response } from 'express';
export const notFound = async (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: 'Resource Not Found'
    });
}