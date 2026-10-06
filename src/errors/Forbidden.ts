import CustomError from '#root/src/errors/CustomError.ts';
import { StatusCodes } from 'http-status-codes';
export default class Forbidden extends CustomError {
    statusCode = StatusCodes.FORBIDDEN;
    constructor(message: string) {
        super(message);
    }
}