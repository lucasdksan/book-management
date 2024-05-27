import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";

@Injectable()
export class AuthorService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateAuthorDTO){
        return await this.prisma.authors.create({
            data
        });
    }

    async list(){
        return await this.prisma.authors.findMany();
    }

    async show(id: number){
        return await this.prisma.authors.findUnique({
            where: { id }
        });
    }

    async update(data: UpdatePutAuthorDTO, id: number){
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if(!updateAuthor) throw new Error("");

        return true;
    }

    async updatePatch(data: UpdatePatchAuthorDTO, id: number) {
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if(!updateAuthor) throw new Error("");

        return true;
    }

    async delete(id: number){
        const deleteBooks = await this.prisma.books.deleteMany({
            where: { author_id: id }
        });
    
        const deleteAuthor = await this.prisma.authors.delete({
            where: { id }
        });

        if(!deleteAuthor || !deleteBooks) throw new Error("");

        return true;
    }
}