import { IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ReservationStatus } from "../../../common/enums/reservationStatus.enums";
import { Type } from "class-transformer";

class Book {
    @IsNumber()
    id: number;

    @IsString()
    title: string;
}

class User {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;
}

export class ViewReservationDTO {
    @IsNumber()
    id: number;

    @IsDateString()
    reservation_date: string;

    @IsDateString()
    due_date: string;

    @IsEnum(ReservationStatus)
    status?: ReservationStatus;

    @IsOptional()
    @ValidateNested()
    @Type(() => Book)
    book: Book;

    @IsOptional()
    @ValidateNested()
    @Type(() => User)
    user: User;
}