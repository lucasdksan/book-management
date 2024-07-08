import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../common/guards/role.guard";
import { CategoryService } from "./category.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("/categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @ApiOperation({ summary: "Registrar uma nova categoria." })
    @ApiBody({ type: CreateCategoryDTO, description: "Dados para registrar a novo categoria." })
    @ApiResponse({ status: 200, description: "Retorna um positivo e uma mensagem de sucesso." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    async create(@Body() body: CreateCategoryDTO) {
        try {
            const result = await this.categoryService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Listar todas as categorias registradas." })
    @ApiResponse({ status: 200, description: "Retorna a lista de categorias." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get()
    async list() {
        try {
            const result = await this.categoryService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Buscar apenas uma categoria." })
    @ApiParam({ name: "Id", description: "Id da categoria." })
    @ApiResponse({ status: 200, description: "Retorna as informações da categoria." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get(":id")
    async read(@ParamId() id:number) {
        try {
            const result = await this.categoryService.show(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar todos os dados da categoria." })
    @ApiParam({ name: "Id", description: "Id da categoria." })
    @ApiBody({ type: UpdatePutCategoryDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Put(":id")
    async update(@Body() body: UpdatePutCategoryDTO, @ParamId() id:number) {
        try {
            const result = await this.categoryService.update(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar os dados de uma categoria de forma parcial." })
    @ApiParam({ name: "Id", description: "Id da categoria." })
    @ApiBody({ type: UpdatePatchCategoryDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchCategoryDTO, @ParamId() id:number) {
        try {
            const result = await this.categoryService.updatePatch(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Deletar a categoria." })
    @ApiParam({ name: "Id", description: "Id da categoria." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.categoryService.delete(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}