import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateBookDTO {
    @ApiProperty({ required: true, default: "Como virar um dev Senior em 2 semanas" })
    @IsString()
    title: string;

    @ApiProperty({ required: true, default: "Uma descrição" })
    @IsString()
    description: string;

    @ApiProperty({ required: true, default: 100.00 })
    @IsNumber()
    price: number;

    @ApiProperty({ required: true, default: "2024-07-10T02:28:31.034Z" })
    @IsDateString()
    publication_date: string;

    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    author_id: number;

    @ApiProperty({ required: true, default: 10 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ required: true, default: 1 })
    @IsNumber()
    categorie_id: number;
}