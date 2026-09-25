import { CustomError } from '#root/src/errors/CustomError.ts';
import type { Request, Response } from 'express';
export const errorHandler = async (err: CustomError, req: Request, res: Response) => {
    const customError = new CustomError('Something unexpected happened. Try again later');
    if (err.message) customError.message = err.message;
    if (err.statusCode) customError.statusCode = err.statusCode
    res.status(customError.statusCode).json({
        message: err.message
    })
}