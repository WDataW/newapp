import { prisma } from '#root/prisma/client.ts';
import bcrypt from 'bcrypt';
import { BadRequest } from '#root/src/errors/BadRequest.ts';
import { hashPassword } from '#root/src/utils/hashPassword.ts';
import { loginSchema, registerSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { Unauthorized } from '#root/src/errors/Unauthorized.ts';
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = validate(loginSchema, req.body);
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (!user) throw new Unauthorized('Invalid Email or Password');// inexistent user
    if (!bcrypt.compareSync(password, user.password))
        throw new Unauthorized('Invalid Email or Password');// wrong password

    // successful login 
    // attach auth tokens here

    res.status(StatusCodes.OK).json();
}
export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = validate(registerSchema, req.body);
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            email, password: hashedPassword, username
        }
    });

    // successful register
    // send email-verification token

    res.status(StatusCodes.OK).json(newUser);
}