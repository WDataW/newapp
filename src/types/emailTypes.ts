export interface Email {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

export interface VerificationEmailCredintials {
    to: string,
    verificationToken: string
}
export interface PasswordResetEmailCredintials {
    to: string,
    resetToken: string
}