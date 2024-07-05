import { IsNumber, IsString } from "class-validator";

export class SchedulingData {
    @IsNumber()
    id: number;

    @IsNumber()
    bookId: number;

    @IsNumber()
    userId: number;

    @IsString()
    status: string;
}