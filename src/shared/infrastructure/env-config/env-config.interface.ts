export interface EnvConfig {
    getAppPort(): number;
    getNodeEnv(): string;
    getDatabaseURL(): string;
    getJwtSecret(): string;
    getJwtExpiresInSeconds(): number;
    getMailerEmail(): string;
    getMailerPassword(): string;
    getMailerHost(): string;
    getMailerPort(): number;
}