import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;

    @IsJWT()
    token: string;
}