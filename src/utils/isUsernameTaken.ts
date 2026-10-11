import { prisma } from '#root/prisma/client.ts';

export const isUsernameTaken = async (username: string): Promise<boolean> => {
    const existingUser = await prisma.user.findUnique({
        where: {
            username: username.toLowerCase(),
        },
        select: {
            id: true
        }
    })
    if (existingUser) return true;
    return false;
} 