import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateBookDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsDate()
    publication_date: Date;

    @IsNumber()
    author_id: number;

    @IsNumber()
    categorie_id: number;
}