
import CustomError from '#root/src/errors/CustomError.ts';
import { StatusCodes } from 'http-status-codes';
export default class Conflict extends CustomError {
    statusCode = StatusCodes.CONFLICT;
    constructor(message: string) {
        super(message);
    };
}