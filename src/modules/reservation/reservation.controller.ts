import { Controller, Get, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { RoleGuard } from "../../common/guards/role.guard";
import { ReservationService } from "./reservation.service";
import { User } from "../../common/decorators/user.decorator";
import { ParamId } from "../../common/decorators/param-id.decorator";

@Roles(Role.Admin, Role.User)
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller("/reservation")
export class ReservationController { 
    constructor(private readonly reservationService: ReservationService){}

    @Post(":id")
    async create(@ParamId() id:number, @User() user){
        try {
            const result = await this.reservationService.create(id, user.id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/user")
    async listUser(@User() user){
        try {
            const result = await this.reservationService.listUser(user.id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}