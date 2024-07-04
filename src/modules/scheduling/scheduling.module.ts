import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { SchedulingService } from "./scheduling.service";
import { SchedulerRegistry } from "@nestjs/schedule";

@Module({
    imports: [PrismaModule],
    providers: [SchedulingService, SchedulerRegistry],
    exports: [SchedulingService],
})
export class SchedulingModule { }