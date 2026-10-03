import { CustomError } from '#root/src/errors/CustomError.ts';
import type { Email } from '#root/src/types/emailTypes.ts';
import { Resend } from 'resend';
const resend = new Resend();
export const sendMail = async (email: Email) => {
    const { data, error } = await resend.emails.send(email);
    if (error) throw new CustomError(error.message);
    return data;
}