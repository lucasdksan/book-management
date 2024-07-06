import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SchedulingData {
    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    bookId: number;

    @ApiProperty({ required: true, default: 3 })
    @IsNumber()
    userId: number;

    @ApiProperty({ required: true, default: "LATE" })
    @IsString()
    status: string;
}