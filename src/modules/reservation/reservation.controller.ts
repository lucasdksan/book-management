import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../common/guards/role.guard";
import { CreateReservationDTO } from "./dto/create-reservation.dto";
import { ReservationService } from "./reservation.service";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller("/reservation")
export class ReservationController { 
    constructor(private readonly reservationService: ReservationService){}

    @ApiOperation({ summary: "Fazer a reserva de um livro." })
    @ApiBody({ type: CreateReservationDTO, description: "Informações para registrar a reserva." })
    @ApiResponse({ status: 200, description: "Retorna um positivo e uma mensagem de sucesso." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    async create(@Body() body: CreateReservationDTO){
        try {
            const result = await this.reservationService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Listar todas as reservas criadas." })
    @ApiResponse({ status: 200, description: "Retorna a lista de reservas." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    async list(){
        try {
            const result = await this.reservationService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Reservas de um usuário." })
    @ApiParam({ name: "Id", description: "Id do usuário." })
    @ApiResponse({ status: 200, description: "Retorna as informações das reservas." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get("/user/:id")
    async listUser(@ParamId() id: number){
        try {
            const result = await this.reservationService.listUser(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Reservas de um livro." })
    @ApiParam({ name: "Id", description: "Id do livro." })
    @ApiResponse({ status: 200, description: "Retorna as informações das reservas." })
    @Roles(Role.Admin, Role.User)
    @UseGuards(RoleGuard)
    @Get("/book/:id")
    async listBook(@ParamId() id: number) {
        try {
            const result = await this.reservationService.listBook(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Registro de retorno." })
    @ApiParam({ name: "Id", description: "Id da reserva." })
    @ApiQuery({ description: "Id do usuário", enumName: "userId" })
    @ApiQuery({ description: "Id do livro", enumName: "bookId" })
    @ApiResponse({ status: 200, description: "Retorna as informações das reservas." })
    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Get("/returned/:id")
    async returnedBook(@ParamId() id: number, @Query("userId") userId: string, @Query("bookId") bookId: string){
        try {
            const result = await this.reservationService.returnedBook(id, Number(userId), Number(bookId));
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}