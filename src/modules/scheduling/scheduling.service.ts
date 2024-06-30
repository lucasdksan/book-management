import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SchedulingService {
    constructor(private readonly prisma: PrismaService){}

    private async updateStatus(bookId: number){

    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        const bookIdList: number[] = [];
        const reservations = await this.prisma.reservations.findMany({
            include: {
                book: true,
                user: true
            }
        });
        const nowDate = new Date();

        reservations.forEach((reservation)=>{
            let reservationDate = new Date(`${reservation.due_date}`);

            if(reservationDate > nowDate) bookIdList.push(reservation.book_id);
        });

        if(bookIdList.length > 0) {
            bookIdList.forEach((id)=>{
                this.updateStatus(id);
            });
        }
    }
}