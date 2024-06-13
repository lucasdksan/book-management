import { Injectable } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateBookDTO){
        const bookCreate = await this.prisma.books.create({
            data
        });

        if(!bookCreate) return { success: false, message: "Erro ao registrar o Livro!" };

        return { success: true, message: "Livro registrado com sucesso!" }
    }

    async list(){
        const bookList = await this.prisma.books.findMany();

        if(!bookList) return { success: false, message: "Erro ao listar os Livros!" };

        return bookList;
    }

    async show(id: number) {
        const book = await this.prisma.books.findUnique({
            where: { id }
        });

        if(!book) return { success: false, message: "Erro ao buscar o Livro!" };

        return book;
    }

    async update(data: UpdatePutBookDTO, id: number){
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) return { success: false, message: "Erro ao atualizar o Livro!" };

        return { success: true, message: "Livro atualizado!" }
    }

    async updatePatch(data: UpdatePatchBookDTO, id: number) {
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) return { success: false, message: "Erro ao atualizar o Livro!" };

        return { success: true, message: "Livro atualizado!" }
    }

    async delete(id: number){
        const deleteBook = await this.prisma.books.delete({
            where: { id }
        });

        if(!deleteBook) return { success: false, message: "Erro ao deletar o Livro!" };

        return { success: true, message: "Livro deletado!" }
    }
}