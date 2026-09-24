import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
export const login = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json(req);
}
export const register = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json(req);
}