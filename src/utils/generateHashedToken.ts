import { genHex } from '#root/src/utils/generateHex.ts'
import { hashString } from '#root/src/utils/hashString.ts';

export const generateHashedToken = (byteCount: number): string => {
    const hex = genHex(byteCount);
    return hashString(hex);
}