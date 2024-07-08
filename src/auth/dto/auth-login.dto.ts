import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
    @ApiProperty({ required: true, default: "LS12as+*" })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;

    @ApiProperty({ required: true, default: "lokasmega@gmail.com" })
    @IsEmail()
    email: string;
}