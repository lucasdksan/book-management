import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "../../../common/enums/role.enum";

export class ViewUserDTO {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(Role)
    role?: Role;

    @IsDateString()
    birth_at?: string;

    @IsOptional()
    @IsDateString()
    penaltyEndDate?: string;

    @IsDateString()
    createdAt: string;

    @IsNumber()
    score: number;
}