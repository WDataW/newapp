import type { Request, Response } from 'express'
import { signAccessJWT, signRefreshJWT, verifyRefreshJWT } from '#root/src/utils/jwt.ts';
import { prisma } from '#root/prisma/client.ts';
import { getFutureDate, isFutureDate } from '#root/src/utils/date.ts';
import type { User } from '#root/generated/prisma/client.ts';
import type { RefreshJWTInput, RefreshJWTOutput } from '#root/src/types/authTypes.ts';
import { StatusCodes } from 'http-status-codes';
import { validate } from '#root/src/validations/validate.ts';
import { refreshTokenSchema } from '#root/src/validations/authSchemas.ts';
import Unauthorized from '#root/src/errors/Unauthorized.ts';
import { fetchRefreshToken } from '#root/src/utils/fetchRecord.ts';
import { dateToUnixSeconds } from '#root/src/utils/time.ts';



export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = validate(refreshTokenSchema, req.body);
    const { sub } = await validateRefreshToken(refreshToken);
    const accessToken = signAccessJWT({ sub });
    res.status(StatusCodes.OK).json({ accessToken });
}

export const validateRefreshToken = async (refreshJWT: string): Promise<RefreshJWTOutput> => {
    const receivedToken: RefreshJWTOutput = verifyRefreshJWT(refreshJWT);
    const DBRefreshToken = await fetchRefreshToken(receivedToken.jti);
    if (!DBRefreshToken) throw new Unauthorized('Invalid Refresh Token');
    if (DBRefreshToken.isRevoked) throw new Unauthorized('Invalid Refresh Token');
    if (!isFutureDate(DBRefreshToken.expiresAt)) throw new Unauthorized('Invalid Refresh Token');
    if (receivedToken.sub !== DBRefreshToken.userId) throw new Unauthorized('Invalid Refresh Token');

    const user = DBRefreshToken.user;
    if (DBRefreshToken.tokenVersion !== user.tokenVersion) throw new Unauthorized('Invalid Refresh Token')

    return {
        sub: DBRefreshToken.userId,
        jti: DBRefreshToken.id,
        tokenVersion: DBRefreshToken.tokenVersion,
        exp: dateToUnixSeconds(DBRefreshToken.expiresAt),
        iat: dateToUnixSeconds(DBRefreshToken.createdAt)
    };// validation successful, return user.id aka 'sub' for the next step
}
export const createDBRefreshToken = async (user: User) => {
    const refreshToken = await prisma.refreshToken.create({
        data: {
            userId: user.id,
            expiresAt: getFutureDate(15),
            tokenVersion: user.tokenVersion,
        }
    })
    return refreshToken;
}
export const issueRefreshToken = async (user: User): Promise<string> => {
    const DBRefreshToken = await createDBRefreshToken(user);

    const refreshPayload: RefreshJWTInput = {
        sub: DBRefreshToken.userId,
        jti: DBRefreshToken.id,
        tokenVersion: user.tokenVersion,
    }
    const refreshToken = signRefreshJWT(refreshPayload);
    return refreshToken;
}