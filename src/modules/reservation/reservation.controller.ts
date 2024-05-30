import { ReservationService } from "./reservation.service";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateReservationDTO } from "./dto/create-reservation.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";

@Controller("/reservation")
export class ReservationController { 
    constructor(private readonly reservationService: ReservationService){}

    @Post()
    async create(@Body() body: CreateReservationDTO){
        return this.reservationService.create(body);
    }

    @Get()
    async list(){
        return this.reservationService.list();
    }

    @Get("/user/:id")
    async listUser(@ParamId() id: number){
        return this.reservationService.listUser(id);
    }

    @Get("/book/:id")
    async listBook(@ParamId() id: number) {
        return this.reservationService.listBook(id);
    }

    @Get("/returned/:id")
    async returnedBook(@ParamId() id: number, @Query("user-id") userId: string){
        return this.reservationService.returnedBook(id, Number(userId));
    }
}