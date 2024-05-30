import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateBookDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsDateString()
    publication_date: string;

    @IsNumber()
    author_id: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    categorie_id: number;
}