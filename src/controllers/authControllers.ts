import { prisma } from '#root/prisma/client.ts';
import bcrypt from 'bcrypt';
import { BadRequest } from '#root/src/errors/BadRequest.ts';
import { hashPassword } from '#root/src/utils/hashPassword.ts';
import { loginSchema, registerSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { Unauthorized } from '#root/src/errors/Unauthorized.ts';
import type { User } from '#root/generated/prisma/client.ts';
import { issueRefreshToken } from '#root/src/controllers/refreshTokenControllers.ts';
import { fetchUserByEmail } from '#root/src/utils/fetchRecord.ts';
import { sendFakeVerificationEmail, sendVerificationEmail } from '#root/src/utils/emails.ts';
import { generateHashedToken } from '#root/src/utils/generateHashedToken.ts';
import { getFutureDate } from '#root/src/utils/date.ts';
import { emailValidator } from '#root/src/validations/credintialsValidators.ts';
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = validate(loginSchema, req.body);
    const user: User = await fetchUserByEmail(email);
    if (!bcrypt.compareSync(password, user.password))
        throw new Unauthorized('Invalid Email or Password');// wrong password
    if (!user.isEmailVerified)
        throw new Unauthorized('Email not Verified');// unverified email
    // successful login
    const refreshToken = await issueRefreshToken(user);
    res.status(StatusCodes.OK).json({ refreshToken });
}
export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = validate(registerSchema, req.body);
    const hashedPassword = await hashPassword(password);
    const existingUser = await fetchUserByEmail(email);
    if (existingUser) {
        // existing account just resend verification email
        await requestVerificationEmail(existingUser);
        res.status(StatusCodes.OK).json();
        return;// don't create a new user since they already exist
    }
    const newUser = await prisma.user.create({
        data: {
            email, password: hashedPassword, username
        }
    });

    // successful register
    await requestVerificationEmail(newUser);
    res.status(StatusCodes.OK).json();
}

const requestVerificationEmail = async (user: User): Promise<void> => {
    const verificationToken = await createVerificationToken(user);
    await sendFakeVerificationEmail({ to: user.email, verificationToken });
    // await sendVerificationEmail({ to: user.email, verificationToken });// in prodcution
}
const createVerificationToken = async (user: User): Promise<string> => {
    const verificationToken = generateHashedToken();
    await prisma.verificationToken.upsert({
        where: { userId: user.id },
        update: {// if there exists a token; replace it
            token: verificationToken.hash,
            expiresAt: getFutureDate(1),// expires in 24 hours
        },
        create: {// if no token exists; create one
            userId: user.id,
            token: verificationToken.hash,
            expiresAt: getFutureDate(1),// expires in 24 hours
        }
    });
    return verificationToken.raw;
}
export const showMe = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json(req.user);
}