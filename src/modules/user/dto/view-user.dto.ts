import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "../../../common/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class ViewUserDTO {
    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, default: "Lucas da Silva Leoncio" })
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: "lokas.ega@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ required: false, default: "ADMIN" })
    @IsEnum(Role)
    role?: Role;

    @ApiProperty({ required: true, default: "2024-07-10T02:28:31.034Z" })
    @IsDateString()
    birth_at?: string;

    @ApiProperty({ required: false, default: "2024-07-10T02:28:31.034Z" })
    @IsOptional()
    @IsDateString()
    penaltyEndDate?: string;

    @ApiProperty({ required: true, default: "2024-07-10T02:28:31.034Z" })
    @IsDateString()
    createdAt: string;

    @ApiProperty({ required: true, default: 10 })
    @IsNumber()
    score: number;
}