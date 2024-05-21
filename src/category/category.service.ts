import { Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}
    
    async create(data: CreateCategoryDTO){
        return this.prisma.categories.create({
            data
        });
    }

    async list(){
        return await this.prisma.categories.findMany();
    }

    async show(id: number) {
        return this.prisma.categories.findUnique({
            where: { id }
        });
    }

    async update(data: UpdatePutCategoryDTO, id: number){
        return await this.prisma.categories.update({
            where: { id },
            data
        });
    }

    async updatePatch(data: UpdatePatchCategoryDTO, id: number) {
        return await this.prisma.categories.update({
            where: { id },
            data
        });
    }

    async delete(id: number){
        await this.prisma.categories.delete({
            where: { id }
        });

        return true;
    }
}