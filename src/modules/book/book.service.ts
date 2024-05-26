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
        return await this.prisma.books.update({
            where: { id },
            data
        });
    }

    async updatePatch(data: UpdatePatchBookDTO, id: number) {
        return await this.prisma.books.update({
            where: { id },
            data
        });
    }

    async delete(id: number){
        await this.prisma.books.delete({
            where: { id }
        });

        return true;
    }
}