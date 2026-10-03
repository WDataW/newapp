export interface Email {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

export interface VerificationEmailCredintials {
    to: string,
    verificationCode: number
}
export interface PasswordResetEmailCredintials {
    to: string,
    resetToken: string
}