import CustomError from '#root/src/errors/CustomError.ts';

const getEnv = (key: string): string => {
    if (!process.env[key]) throw new CustomError(`Env variable missing at: ${key}`);
    return process.env[key];
}

export const PORT: string = getEnv('PORT');
export const DATABASE_URL: string = getEnv('DATABASE_URL');
export const JWT_SECRET: string = getEnv('JWT_SECRET');
export const RESEND_SECRET_KEY: string = getEnv('RESEND_SECRET_KEY');
export const EMAIL_SENDER: string = getEnv('EMAIL_SENDER');
export const FRONT_END_URL: string = getEnv('FRONT_END_URL');
export const TESTING_SMTP_USER: string = getEnv('TESTING_SMTP_USER');
export const TESTING_SMTP_PASSWORD: string = getEnv('TESTING_SMTP_PASSWORD');
export const TESTING_SMTP_HOST: string = getEnv('TESTING_SMTP_HOST');

