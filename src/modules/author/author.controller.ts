import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../common/guards/role.guard";
import { AuthorService } from "./author.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("authors")
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @ApiOperation({ summary: "Criar um novo autor." })
    @ApiBody({ type: CreateAuthorDTO, description: "Dados para registrar um novo autor." })
    @ApiResponse({ status: 200, description: "Retorna um positivo e uma mensagem de sucesso." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    async create(@Body() body: CreateAuthorDTO){
        try {
            const result = await this.authorService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Listar todos os autores registrados." })
    @ApiResponse({ status: 200, description: "Retorna a lista de autores." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get()
    async list(){
        try {
            const result = await this.authorService.list();
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Buscar apenas um autor." })
    @ApiParam({ name: "Id", description: "Id do autor." })
    @ApiResponse({ status: 200, description: "Retorna as informações do autor." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get(":id")
    async read(@ParamId() id:number){
        try {
            const result = await this.authorService.show(id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar todos os dados de um usuário." })
    @ApiParam({ name: "Id", description: "Id do autor." })
    @ApiBody({ type: UpdatePutAuthorDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Put(":id")
    async update(@Body() body: UpdatePutAuthorDTO, @ParamId() id:number){
        try {
            const result = await this.authorService.update(body, id);
            return result
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar os dados de um usuário parcialmente." })
    @ApiParam({ name: "Id", description: "Id do autor." })
    @ApiBody({ type: UpdatePatchAuthorDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchAuthorDTO, @ParamId() id:number) {
        try {
            const result = await this.authorService.updatePatch(body, id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Deletar o autor." })
    @ApiParam({ name: "Id", description: "Id do autor." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.authorService.delete(id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}