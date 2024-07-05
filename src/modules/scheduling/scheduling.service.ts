import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { PrismaService } from "../../prisma/prisma.service";
import { SchedulingData } from "./dto/scheduling-data.dto";

@Injectable()
export class SchedulingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly schedulerRegistry: SchedulerRegistry
    ){}

    private async updateStatus(statusData: SchedulingData){
        const resultBook = await this.prisma.reservations.update({
            where: { id:statusData.bookId },
            data: { status: "LATE" }
        });

        const user = await this.prisma.users.findUnique({
            where: { id: statusData.userId }
        });

        const score = user.score;

        const resultUser = await this.prisma.users.update({
            where: { id: statusData.userId },
            data: { score: score - 1 }
        })

        console.log({ resultBook, resultUser });
    }

    @Cron(CronExpression.EVERY_DAY_AT_2AM, {
        name: 'handleCronJob',
    })
    async handleCron() {
        const bookIdList: SchedulingData[] = [];
        const reservations = await this.prisma.reservations.findMany({
            where: {
                OR: [
                    { status: "LATE" },
                    { status: "RESERVED" }
                ],
                due_date: { lt: new Date() }
            },
            include: {
                book: true,
                user: true
            }
        });
        
        reservations.forEach((reservation) => {
            bookIdList.push({ bookId: reservation.book_id, userId: reservation.user_id, status: reservation.status });
        });

        if (bookIdList.length > 0) {
            for (const data of bookIdList) {
                await this.updateStatus(data);
            }

            const job = this.schedulerRegistry.getCronJob('handleCronJob');
            job.stop();
            console.log('Cron job parado após a execução.');
        }
    }
}