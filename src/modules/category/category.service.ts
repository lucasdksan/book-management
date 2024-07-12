import { HttpStatus, Injectable } from "@nestjs/common";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}

    private async categoryExistsInDb(name?: string, id?: number){
        const category = await this.prisma.categories.findFirst({
            where: {
                OR: [
                    { name },
                    { id }
                ].filter(Boolean)
            }
        });

        return !!category;
    }
    
    async create(data: CreateCategoryDTO){
        const categoryExists = await this.categoryExistsInDb(data.name, undefined);

        if(categoryExists) throw new CustomException(false, "A categoria já existe", HttpStatus.UNPROCESSABLE_ENTITY);

        const categoryCreate = await this.prisma.categories.create({
            data
        });

        if(!categoryCreate) throw new CustomException(false, "Erro ao criar categoria!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Categoria criada com sucesso!" };
    }

    async list(){
        const categoryList = await this.prisma.categories.findMany();

        if(!categoryList) throw new CustomException(false, "Erro ao listar as categorias", HttpStatus.BAD_REQUEST);

        return categoryList;
    }

    async show(id: number) {
        const category = await this.prisma.categories.findUnique({
            where: { id }
        });

        if(!category) throw new CustomException(false, "Erro ao buscar a categoria", HttpStatus.BAD_REQUEST);

        return category;
    }

    async update(data: UpdatePutCategoryDTO, id: number){
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) throw new CustomException(false, "Erro ao atualizar a categoria!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Categoria atualizada com sucesso!" };
    }

    async updatePatch(data: UpdatePatchCategoryDTO, id: number) {
        const updateCategory = await this.prisma.categories.update({
            where: { id },
            data
        });

        if(!updateCategory) throw new CustomException(false, "Erro ao atualizar a categoria!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Categoria atualizada com sucesso!" };
    }

    async delete(id: number){
        const deleteCategory = await this.prisma.categories.delete({
            where: { id }
        });

        if(!deleteCategory) throw new CustomException(false, "Erro ao deletar a categoria!", HttpStatus.BAD_REQUEST);

        return { success: true, message: "Categoria deletada com sucesso!" };
    }
}