import { CustomError } from '#root/src/errors/CustomError.ts';
import { StatusCodes } from 'http-status-codes';

class NotFound extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;
    constructor(message: string) {
        super(message);
    };
}
module.exports = NotFound;