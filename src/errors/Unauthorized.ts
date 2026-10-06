import CustomError from '#root/src/errors/CustomError.ts';
import { StatusCodes } from 'http-status-codes';

export default class Unauthorized extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    constructor(message: string) {
        super(message);
    };
}