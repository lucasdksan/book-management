import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../../../common/enums/role.enums";

export class ViewUserDTO {
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
}