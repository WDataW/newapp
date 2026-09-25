import { prisma } from '#root/prisma/client.ts';
import { loginSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = validate(loginSchema, req.body);
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    res.status(StatusCodes.OK).json(req);
}
export const register = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json(req);
}