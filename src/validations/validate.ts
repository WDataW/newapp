import { ValidationError } from '#root/src/errors/ValidationError.ts';
import type { ZodType } from 'zod';

export const validate = <T>(schema: ZodType<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) throw new ValidationError(result.error.message);
    return result.data;
}