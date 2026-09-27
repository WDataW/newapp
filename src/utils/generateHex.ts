import { randomBytes } from 'crypto';
export const genHex = (bytes: number): string => {
    return randomBytes(bytes).toString('hex');
}