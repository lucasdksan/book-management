import { BookEntity } from "../../domain/entities/book.entity";

export type BookOutput = {
    author: string;
    quantity: number;
    category: string;
    state: string;
    publicationDate: Date;
    description: string;
    price: number;
    title: string;
    createdAt: Date;
}

export class BookOutputMapper {
    static toOutput(entity: BookEntity):BookOutput {
        return entity.toJSON();
    }
}