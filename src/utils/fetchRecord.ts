// intended for basic prisma findUnique using a unique attribute value (email, id)

import type { RefreshToken, User } from '#root/generated/prisma/client.ts';
import { prisma } from '#root/prisma/client.ts';

export const fetchRefreshToken = async (id: string): Promise<RefreshToken | null> => {
    return prisma.refreshToken.findUnique({
        where: {
            id
        }
    });
}
export const fetchUser = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}
export const fetchUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}