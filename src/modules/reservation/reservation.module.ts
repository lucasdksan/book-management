import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { ReservationController } from "./reservation.controller";

@Module({
    imports: [PrismaModule],
    controllers: [ReservationController],
    exports: [ReservationService],
    providers: [ReservationService]
})
export class ReservationModule { }