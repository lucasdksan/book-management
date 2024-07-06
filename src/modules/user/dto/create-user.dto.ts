import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../../../common/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({ required: true, default: "Lucas da Silva" })
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: "lokasmega@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, default: "asDS12+-" })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 2
    })
    password: string;

    @ApiProperty({ required: false, default: "USER" })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @ApiProperty({ required: false, default: "2024-07-10T02:28:31.034Z" })
    @IsOptional()
    @IsDateString()
    birth_at?: string;

    @ApiProperty({ required: true, default: "1234123" })
    @IsString()
    cep: string;
    
    @ApiProperty({ required: true, default: "Fortaleza" })
    @IsString()
    city: string;
    
    @ApiProperty({ required: true, default: "Pedras" })
    @IsString()
    neighborhood: string;
    
    @ApiProperty({ required: true, default: "1231" })
    @IsString()
    number: string;
    
    @ApiProperty({ required: true, default: "Rua Cazinhas" })
    @IsString()
    street: string;
    
    @ApiProperty({ required: true, default: "CE" })
    @IsString()
    @Length(2, 2)
    uf: string;
}