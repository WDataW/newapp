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
