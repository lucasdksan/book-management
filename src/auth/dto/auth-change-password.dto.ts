import { IsStrongPassword } from "class-validator";

export class AuthChangePasswordDTO {
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;
}