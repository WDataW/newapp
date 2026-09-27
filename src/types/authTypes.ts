
export interface authTokens {
    access?: string,
    refresh: string
}

export interface accessJWTPayload {

};
export interface refreshJWTPayload {
    sub: string,
    jti: string,
    tokenVersion: number
};
