import { Injectable } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}
    
    async create(data: CreateCategoryDTO){
        const categoryCreate = await this.prisma.categories.create({
            data
        });

        if(!categoryCreate) return { success: false, message: "Erro ao criar categoria!" };

        return { success: true, message: "Categoria criada com sucesso!" }
    }

    async list(){
        const categoryList = await this.prisma.categories.findMany();

        if(!categoryList) return { success: false, message: "Erro ao listar as categorias" };

        return categoryList;
    }

    async show(id: number) {
        const category = await this.prisma.categories.findUnique({
            where: { id }
        });

        if(!category) return { success: false, message: "Erro ao buscar a categoria" };

        return category;
    }

    async update(data: UpdatePutCategoryDTO, id: number){
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) return { success: false, message: "Erro ao atualizar a categoria!" };

        return { success: true, message: "Categoria atualizada com sucesso!" }
    }

    async updatePatch(data: UpdatePatchCategoryDTO, id: number) {
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) return { success: false, message: "Erro ao atualizar a categoria!" };

        return { success: true, message: "Categoria atualizada com sucesso!" }
    }

    async delete(id: number){
        const deleteCategory = await this.prisma.categories.delete({
            where: { id }
        });

        if(!deleteCategory) return { success: false, message: "Erro ao deletar a categoria!" };

        return { success: true, message: "Categoria deletada com sucesso!" }
    }
}