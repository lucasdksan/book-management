import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../enums/role.enums";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: string;

    @IsOptional()
    @IsDateString()
    birth_at: string;
}