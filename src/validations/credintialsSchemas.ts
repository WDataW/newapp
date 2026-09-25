import * as zod from 'zod';
export const passwordValdiator = zod.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,72}$/, { error: 'Password too weak' });
export const token = zod.string().regex(/^[a-f0-9]{64}$/, { message: 'Invalid password-reset token' });
