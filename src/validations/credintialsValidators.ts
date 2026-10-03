import { tokenByteCount } from '#root/src/config/constants.ts';
import * as zod from 'zod';
export const passwordValdiator = zod.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,72}$/, { error: 'Password too weak' });
export const tokenValidator = zod.string().regex(new RegExp(`^[a-f0-9]{${tokenByteCount * 2}}$`), { message: 'Invalid token' });
export const emailValidator = zod.email().trim().toLowerCase();