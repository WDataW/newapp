// intended for basic prisma findUnique using a unique attribute value (email, id)

import type { VerificationToken } from '#root/generated/prisma/browser.ts';
import type { RefreshToken, ResetPasswordToken, User } from '#root/generated/prisma/client.ts';
import { prisma } from '#root/prisma/client.ts';
import BadRequest from '#root/src/errors/BadRequest.ts';
import Conflict from '#root/src/errors/Conflict.ts';
import Unauthorized from '#root/src/errors/Unauthorized.ts';
import { isFutureDate } from '#root/src/utils/date.ts';

export const fetchRefreshToken = async (id: string): Promise<RefreshToken & { user: { tokenVersion: number } }> => {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: {
            id
        },
        include: {// fetch user tokenVersion for validation
            user: { select: { tokenVersion: true } }
        }
    });
    if (!refreshToken) throw new Unauthorized('Invalid Refresh Token');
    return refreshToken;
}
export const fetchUser = async (id: string): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) throw new Unauthorized('Invalid Email or Password');
    if (user.deletedAt) throw new Conflict('Account Pending Deletion');
    return user;
}
export const fetchVerificationToken = async (token: string): Promise<VerificationToken> => {
    const verificationToken = await prisma.verificationToken.findUnique({
        where: {
            token
        }
    });

    if (!verificationToken ||
        verificationToken.isRevoked ||
        !isFutureDate(verificationToken.expiresAt)
    ) throw new BadRequest('Invalid Verification Token');
    return verificationToken;
}
export const fetchResetToken = async (token: string): Promise<ResetPasswordToken> => {
    const resetToken = await prisma.resetPasswordToken.findUnique({
        where: {
            token
        }
    });

    if (!resetToken ||
        resetToken.isRevoked ||
        !isFutureDate(resetToken.expiresAt)
    ) throw new BadRequest('Invalid Reset Token');
    return resetToken;
}
export const fetchUserByEmail = async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) throw new Unauthorized('Invalid Email or Password');
    if (user.deletedAt) throw new Conflict('Account Pending Deletion');
    return user;
}