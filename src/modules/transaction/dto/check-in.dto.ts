import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CheckInDTO {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    bookId: number;

    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    userId: number;
}