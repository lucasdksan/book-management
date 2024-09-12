import { BookOutput, BookOutputMapper } from "../dtos/book-output.dto";
import { UseCase as DefaultUseCase } from "../../../shared/application/usecases/use-case";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BadRequestError } from "../../../shared/application/errors/bad-request.error";
import { BookEntity } from "../../domain/entities/book.entity";

export namespace Create {
    export type Input = { 
        author: string;
        quantity: number;
        category: string;
        state: string;
        publicationDate: Date;
        description: string;
        price: number;
        title: string;
    };

    export type Output = BookOutput;

    export class Usecase implements DefaultUseCase<Input, Output> {
        constructor(private bookRepository: BookRepository.Repository){}

        async execute(input: Input): Promise<BookOutput> {
            const { author, category, description, price, publicationDate, quantity, state, title } = input;

            if(!author || !category || !description || !price || !publicationDate || !quantity || !state || !title ) throw new BadRequestError("Input data not provided");

            await this.bookRepository.bookExists(title);

            const entity = new BookEntity({
                author, category, description, price, publicationDate, quantity, state, title
            });

            await this.bookRepository.insert(entity);

            return BookOutputMapper.toOutput(entity);
        }
    }
}