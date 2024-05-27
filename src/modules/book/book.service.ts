import { Injectable } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateBookDTO){
        return await this.prisma.books.create({
            data
        });
    }

    async list(){
        return await this.prisma.books.findMany();
    }

    async show(id: number) {
        return await this.prisma.books.findUnique({
            where: { id }
        });
    }

    async update(data: UpdatePutBookDTO, id: number){
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) throw new Error("");

        return true;
    }

    async updatePatch(data: UpdatePatchBookDTO, id: number) {
        const updateBook = await this.prisma.books.update({
            where: { id },
            data
        });

        if(!updateBook) throw new Error("");
    
        return true;
    }

    async delete(id: number){
        const deleteBook = await this.prisma.books.delete({
            where: { id }
        });

        if(!deleteBook) throw new Error("");

        return true;
    }
}