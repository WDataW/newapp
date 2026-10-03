import { TESTING_SMTP_HOST, TESTING_SMTP_PASSWORD, TESTING_SMTP_USER } from '#root/src/config/environment.ts';
import nodemailer from 'nodemailer';


// Create a transporter using SMTP
export const createTransporter = () => nodemailer.createTransport({
    host: TESTING_SMTP_HOST,
    port: 587,
    secure: process.env.NODE_ENV == 'production',
    auth: {
        user: TESTING_SMTP_USER,
        pass: TESTING_SMTP_PASSWORD,
    },
});