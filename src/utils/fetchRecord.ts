// intended for basic prisma findUnique using a unique attribute value (email, id)

import type { RefreshToken, User } from '#root/generated/prisma/client.ts';
import { prisma } from '#root/prisma/client.ts';
import { Unauthorized } from '#root/src/errors/Unauthorized.ts';

export const fetchRefreshToken = async (id: string): Promise<RefreshToken> => {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: {
            id
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
    return user;
}
export const fetchUserByEmail = async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) throw new Unauthorized('Invalid Email or Password');
    return user;
}