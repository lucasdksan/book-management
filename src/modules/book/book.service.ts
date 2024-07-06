import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService){}

    private async bookExistsInDb(title?: string, id?: number){
        const book = await this.prisma.books.findFirst({
            where: {
                OR: [
                    { title },
                    { id }
                ].filter(Boolean)
            }
        });

        return !!book;
    }

    async create(data: CreateBookDTO){
        const bookExists = await this.bookExistsInDb(data.title, undefined);

        if(bookExists) throw new CustomException(false, "O livro já registrado", HttpStatus.UNPROCESSABLE_ENTITY);
        
        const bookCreate = await this.prisma.books.create({
            data
        });

        if(!bookCreate) throw new CustomException(false, "Erro ao registrar o Livro!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Livro registrado com sucesso!" }
    }

    async list(){
        const bookList = await this.prisma.books.findMany();

        if(!bookList) throw new CustomException(false, "Erro ao listar os Livros!", HttpStatus.BAD_REQUEST);

        return bookList;
    }

    async show(id: number) {
        const book = await this.prisma.books.findUnique({
            where: { id }
        });

        if(!book) throw new CustomException(false, "Erro ao buscar o Livro!", HttpStatus.BAD_REQUEST);

        return book;
    }

    async update(data: UpdatePutBookDTO, id: number){
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) throw new CustomException(false, "Erro ao atualizar o Livro!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Livro atualizado!" }
    }

    async updatePatch(data: UpdatePatchBookDTO, id: number) {
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) throw new CustomException(false, "Erro ao atualizar o Livro!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Livro atualizado!" }
    }

    async delete(id: number){
        const deleteBook = await this.prisma.books.delete({
            where: { id }
        });

        if(!deleteBook) throw new CustomException(false, "Erro ao deletar o Livro!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Livro deletado!" }
    }
}