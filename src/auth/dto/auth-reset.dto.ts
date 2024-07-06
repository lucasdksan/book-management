import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    @ApiProperty({ required: true, default: "LS12as+*" })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;

    @ApiProperty({ required: true, default: "um token" })
    @IsJWT()
    token: string;
}