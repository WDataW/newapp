import { CustomError } from '#root/src/errors/CustomError.ts';
import { msToMinute } from '#root/src/utils/time.ts';
import { StatusCodes } from 'http-status-codes';

export class TooManyRequests extends CustomError {
    statusCode = StatusCodes.TOO_MANY_REQUESTS;
    constructor(retryAfter: number) {// retryAfter is in milli-seconds
        super(`Too many request, try again later in ${msToMinute(retryAfter)} minutes`);
    };
}