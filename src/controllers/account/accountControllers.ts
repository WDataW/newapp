import { StatusCodes } from 'http-status-codes';
import type { Request, Response } from 'express';
import { validate } from '#root/src/validations/validate.ts';
import { passwordValdiator } from '#root/src/validations/credintialsValidators.ts';
import { fetchUser } from '#root/src/utils/fetchRecord.ts';
import bcrypt from 'bcrypt';
import { prisma } from '#root/prisma/client.ts';
import { getFutureDate } from '#root/src/utils/date.ts';
import Forbidden from '#root/src/errors/Forbidden.ts';
import Conflict from '#root/src/errors/Conflict.ts';
import type { User } from '#root/generated/prisma/browser.ts';
import Unauthorized from '#root/src/errors/Unauthorized.ts';
import { loginSchema } from '#root/src/validations/authSchemas.ts';
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    const password = validate(passwordValdiator, req.body?.password);
    const user = await fetchUser(req.user.id);
    if (user.deletedAt)
        throw new Conflict('Account Already Pending Deletion');
    if (!bcrypt.compareSync(password, user.password))
        throw new Forbidden('Incorrect Password');// wrong password

    await prisma.$transaction([
        prisma.user.update({
            where: { id: user.id },
            data: {
                deletedAt: new Date(),
                purgeAfter: getFutureDate(30),// anonymize in 30 days
                tokenVersion: { increment: 1 }
            }
        }),
        prisma.refreshToken.deleteMany({
            where: { userId: user.id }
        }),
        prisma.verificationToken.deleteMany({
            where: { userId: user.id }
        }),
        prisma.resetPasswordToken.deleteMany({
            where: { userId: user.id }
        })
    ]);
    res.status(StatusCodes.OK).json();
}

export const undeleteAccount = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = validate(loginSchema, req.body);
    const user: User | null = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user || // no user exists
        !bcrypt.compareSync(password, user.password) ||// wrong password
        user.purgeAfter && user.purgeAfter <= new Date())// trying to undelete after purge is due
        throw new Unauthorized('Invalid Email or Password');
    if (!user.deletedAt) throw new Conflict('Account isn\'t deleted');
    await prisma.user.update({
        where: {
            email,
            deletedAt: { not: null }
        },
        data: {
            deletedAt: null,
            purgeAfter: null,
        }
    });

    res.status(StatusCodes.OK).json();
}