import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { EnvConfig } from "./env-config.interface";

@Injectable()
export class EnvConfigService implements EnvConfig{
    constructor(private readonly configService: ConfigService){}
    
    getAppPort(): number {
        return Number(this.configService.get<number>("PORT"));
    }

    getNodeEnv(): string {
        return String(this.configService.get<string>("NODE_ENV"));
    }

    getDatabaseURL(): string {
        return String(this.configService.get<string>("DATABASE_URL"));
    }

    getJwtSecret(): string {
        return String(this.configService.get<string>("JWT_SECRET"));
    }

    getJwtExpiresInSeconds(): number {
        return Number(this.configService.get<number>("JWT_EXPIRES_IN"));
    }

    getMailerEmail(): string {
        return String(this.configService.get<string>("MAILER_EMAIL"));
    }

    getMailerPassword(): string {
        return String(this.configService.get<string>("MAILER_PASSWORD"));
    }

    getMailerHost(): string {
        return String(this.configService.get<string>("MAILER_HOST"));
    }

    getMailerPort(): number {
        return Number(this.configService.get<number>("MAILER_PORT"));
    }
}





