import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTransactionDTO {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    book_id: number;

    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    user_id: number;
}