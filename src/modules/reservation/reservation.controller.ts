import { ReservationService } from "./reservation.service";
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { CreateReservationDTO } from "./dto/create-reservation.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("/reservation")
export class ReservationController { 
    constructor(private readonly reservationService: ReservationService){}

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

    @Get("/returned/:id")
    async returnedBook(@ParamId() id: number, @Query("userId") userId: string){
        try {
            const result = await this.reservationService.returnedBook(id, Number(userId));
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}