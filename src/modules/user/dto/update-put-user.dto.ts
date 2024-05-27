import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdatePutUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsDateString()
    birth_at?: string;
}