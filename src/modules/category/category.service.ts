import { Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}
    
    async create(data: CreateCategoryDTO){
        return await this.prisma.categories.create({
            data
        });
    }

    async list(){
        return await this.prisma.categories.findMany();
    }

    async show(id: number) {
        return await this.prisma.categories.findUnique({
            where: { id }
        });
    }

    async update(data: UpdatePutCategoryDTO, id: number){
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) throw new Error("");

        return true;
    }

    async updatePatch(data: UpdatePatchCategoryDTO, id: number) {
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) throw new Error("");

        return true;
    }

    async delete(id: number){
        const deleteCategory = await this.prisma.categories.delete({
            where: { id }
        });

        if(!deleteCategory) throw new Error("");

        return true;
    }
}