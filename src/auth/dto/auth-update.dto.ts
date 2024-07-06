import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class AuthUpdateDTO {
    @ApiProperty({ required: true, default: "Lucas da Silva Leoncio" })
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: "lokasmega@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ required: false, default: "2024-07-10T02:28:31.034Z" })
    @IsOptional()
    @IsDateString()
    birth_at?: string;
}