import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { CustomException } from "../exceptions/custom-exception.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email",
            passwordField: "password",
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) throw new CustomException(false, "Usuário ou senha incorretos!", HttpStatus.UNAUTHORIZED);
        return user;
    }
}