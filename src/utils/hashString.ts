import { createHash } from 'crypto';
export const hashString = (string: string): string => {
    return createHash('sha256').update(string).digest('hex')
}