import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../common/guards/role.guard";
import { UserService } from "./user.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @ApiOperation({ summary: "Registrar um novo usuário." })
    @ApiBody({ type: CreateUserDTO, description: "Dados para registrar o novo usuário." })
    @ApiResponse({ status: 200, description: "Retorna um positivo e uma mensagem de sucesso." })
    @Post()
    async create(@Body() body: CreateUserDTO){
        try {
            const result = await this.userService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Listar todos os usuário registrados." })
    @ApiResponse({ status: 200, description: "Retorna a lista de usuário." })
    @Get()
    async list(){
        try {
            const result = await this.userService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Buscar apenas um usuário." })
    @ApiParam({ name: "Id", description: "Id do usuário." })
    @ApiResponse({ status: 200, description: "Retorna as informações do usuário." })
    @Get(":id")
    async read(@ParamId() id:number){
        try {
            const result = await this.userService.show(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar todos os dados do usuário." })
    @ApiParam({ name: "Id", description: "Id do usuário." })
    @ApiBody({ type: UpdatePutUserDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Put(":id")
    async update(@Body() body: UpdatePutUserDTO, @ParamId() id:number){
        try {
            const result = await this.userService.update(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Atualizar os dados do usuário de forma parcial." })
    @ApiParam({ name: "Id", description: "Id do usuário." })
    @ApiBody({ type: UpdatePatchUserDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchUserDTO, @ParamId() id:number) {
        try {
            const result = await this.userService.updatePatch(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Deletar um  usuário." })
    @ApiParam({ name: "Id", description: "Id do usuário." })
    @ApiResponse({ status: 200, description: "Retorna mensagem positiva." })
    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}