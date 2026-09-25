import { CustomError } from '#root/src/errors/CustomError.ts';
import { StatusCodes } from 'http-status-codes';

export class ValidationError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    constructor(message: string) {
        super(message);
    }
}

