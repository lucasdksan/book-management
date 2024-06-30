import { IsNumber } from "class-validator";

export class SchedulingData {
    @IsNumber()
    bookId: number;

    @IsNumber()
    userId: number;
}