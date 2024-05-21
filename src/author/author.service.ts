import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
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
        return await this.prisma.authors.update({
            where: { id },
            data
        });
    }

    async updatePatch(data: UpdatePatchAuthorDTO, id: number) {
        return await this.prisma.authors.update({
            where: { id },
            data
        });
    }

    async delete(id: number){
        await this.prisma.books.deleteMany({
            where: { author_id: id }
        });
    
        await this.prisma.authors.delete({
            where: { id }
        });

        return true;
    }
}