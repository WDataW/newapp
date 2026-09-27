import { randomBytes } from 'crypto';
const genHex = (bytes: number): string => {
    return randomBytes(bytes).toString('hex');
}