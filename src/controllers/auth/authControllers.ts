import { prisma } from '#root/prisma/client.ts';
import bcrypt from 'bcrypt';
import { hashPassword } from '#root/src/utils/hashPassword.ts';
import { loginSchema, refreshTokenSchema, registerSchema } from '#root/src/validations/authSchemas.ts';
import { validate } from '#root/src/validations/validate.ts';
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import Unauthorized from '#root/src/errors/Unauthorized.ts';
import type { User } from '#root/generated/prisma/client.ts';
import { issueRefreshToken, validateRefreshToken } from '#root/src/controllers/auth/refreshTokenControllers.ts';
import { fetchResetToken, fetchUser, fetchUserByEmail, fetchVerificationToken } from '#root/src/utils/fetchRecord.ts';
import { sendFakeResetEmail, sendFakeVerificationEmail } from '#root/src/utils/emails.ts';
import { generateHashedToken } from '#root/src/utils/generateHashedToken.ts';
import { getFutureDate, getNextHour } from '#root/src/utils/date.ts';
import { emailValidator, passwordValdiator, tokenValidator } from '#root/src/validations/credintialsValidators.ts';
import { hashString } from '#root/src/utils/hashString.ts';


// Log in/out Starts Here
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
export const logout = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = validate(refreshTokenSchema, req.body);
    const validatedToken = await validateRefreshToken(refreshToken);
    await prisma.refreshToken.update({
        where: {
            id: validatedToken.jti,
            userId: validatedToken.sub
        },
        data: {
            isRevoked: true// logout: revoke the current refreshToken
        }
    });
    res.status(StatusCodes.OK).json();
}
export const logoutAllSessions = async (req: Request, res: Response): Promise<void> => {
    const id = req.user.id;
    await prisma.user.update({
        where: { id },
        data: { tokenVersion: { increment: 1 } }
    });
    res.status(StatusCodes.OK).json();
}
// Log in/out Ends Here

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

// Password Reset Starts Here
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const token = validate(tokenValidator, req.query?.token);

    const newPassword = validate(passwordValdiator, req.body?.newPassword);
    const resetToken = await fetchResetToken(hashString(token));
    const user = await fetchUser(resetToken.userId);

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({// set new password
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: {
                update: {
                    isRevoked: true,
                }
            },
        }
    });
    res.status(StatusCodes.OK).json();
}
export const requestResetPassword = async (req: Request, res: Response): Promise<void> => {
    const email = validate(emailValidator, req.body?.email);
    const user = await fetchUserByEmail(email);
    const resetToken = await createResetToken(user);
    await sendFakeResetEmail({ to: user.email, resetToken });
    res.status(StatusCodes.OK).json();
}
export const createResetToken = async (user: User): Promise<string> => {
    const resetToken = generateHashedToken();
    await prisma.resetPasswordToken.upsert({
        where: { userId: user.id },
        update: {
            token: resetToken.hash,
            expiresAt: getNextHour(),// expires in an hour
            isRevoked: false
        },
        create: {
            userId: user.id,
            token: resetToken.hash,
            expiresAt: getNextHour(),// expires in an hour
        }
    });
    return resetToken.raw;
}
// Password Reset Ends Here

// Email Verification Starts Here
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    const token = validate(tokenValidator, req.query?.token);

    const verificationToken = await fetchVerificationToken(token);
    await prisma.user.update({// email verified successfully
        where: {
            id: verificationToken.userId
        },
        data: {
            isEmailVerified: true,
            verificationToken: {
                update: {
                    isRevoked: true
                }
            }
        }
    });
    res.status(StatusCodes.OK).json();
}
export const resendVerificationEmail = async (req: Request, res: Response): Promise<void> => {
    const email = validate(emailValidator, req.body?.email);
    const user = await fetchUserByEmail(email);
    await requestVerificationEmail(user);
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
            isRevoked: false
        },
        create: {// if no token exists; create one
            userId: user.id,
            token: verificationToken.hash,
            expiresAt: getFutureDate(1),// expires in 24 hours
        }
    });
    return verificationToken.raw;
}
// Email Verification Ends Here


export const showMe = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json(req.user);
}