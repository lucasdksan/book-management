import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AuthForgetDTO {
    @ApiProperty({ required: true, default: "lokasmega@gmail.com" })
    @IsEmail()
    email: string;
}