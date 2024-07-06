import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SchedulingUser {
    @ApiProperty({ required: true, default: 2 })
    @IsNumber()
    userId: number;
}