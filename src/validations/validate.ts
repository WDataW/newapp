import { ValidationError } from '#root/src/errors/ValidationError.ts';
import type { ZodType } from 'zod';
import { z as zod } from 'zod';
import { createErrorMap, fromError } from 'zod-validation-error';
zod.config({
    customError: createErrorMap(),
}
);
export const validate = <T>(schema: ZodType<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const userFriendlyError = fromError(result.error);
        throw new ValidationError(userFriendlyError.message);
    }
    return result.data;
}