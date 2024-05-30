import { IsNumber } from "class-validator";

export class CreateReservationDTO {
    @IsNumber()
    book_id: number;

    @IsNumber()
    user_id: number;
}