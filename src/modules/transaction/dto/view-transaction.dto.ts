import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ReservationStatus } from "../../../common/enums/reservation-status.enum";
import { ApiProperty } from "@nestjs/swagger";

class Book {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, default: "Como ser um bom dev" })
    @IsString()
    title: string;
}

class User {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, default: "Lucas da Silva" })
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: "lokasmega@gmail.com" })
    @IsEmail()
    email: string;
}

export class ViewTransactionDTO {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, default: "2024-07-10T02:28:31.034Z" })
    @IsDateString()
    reservation_date: string;

    @ApiProperty({ required: true, default: "2024-07-10T02:28:31.034Z" })
    @IsDateString()
    due_date: string;

    @ApiProperty({ required: false, default: "LATE" })
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;

    @ApiProperty({ required: false, default: "Um dos livros" })
    @IsOptional()
    @ValidateNested()
    @Type(() => Book)
    book: Book;

    @ApiProperty({ required: false, default: "Um dos usuários" })
    @IsOptional()
    @ValidateNested()
    @Type(() => User)
    user: User;
}