import { ReservationService } from "./reservation.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateReservationDTO } from "./dto/create-reservation.dto";

@Controller("/reservation")
export class ReservationController { 
    constructor(private readonly reservationService: ReservationService){}

    @Post()
    async create(@Body() body: CreateReservationDTO){
        return this.reservationService.create(body);
    }
}