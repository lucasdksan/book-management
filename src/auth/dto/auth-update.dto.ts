import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class AuthUpdateDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsDateString()
    birth_at?: string;
}