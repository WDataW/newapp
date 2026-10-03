import { tokenByteCount } from '#root/src/config/constants.ts';
import { genHex } from '#root/src/utils/generateHex.ts'
import { hashString } from '#root/src/utils/hashString.ts';

interface Tokens {
    hash: string, raw: string
}
//returns both hashed token and raw token
export const generateHashedToken = (): Tokens => {
    const hex = genHex(tokenByteCount ?? 32);
    return {
        hash: hashString(hex), raw: hex
    };
}