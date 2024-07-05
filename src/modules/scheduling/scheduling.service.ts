import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { PrismaService } from "../../prisma/prisma.service";
import { SchedulingData } from "./dto/scheduling-data.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class SchedulingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly mailer: MailerService
    ) {}

    private async sendEmail(userId: number, bookId: number) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId }
        });

        const book = await this.prisma.books.findUnique({
            where: { id: bookId }
        });

        const score = user.score;

        const mailer = await this.mailer.sendMail({
            subject: "Devolução do Livro",
            to: user.email,
            template: "return-book",
            context: {
                name: user.name,
                book: book.title
            }
        });

        const resultUser = await this.prisma.users.update({
            where: { id: userId },
            data: { score: score - 1 }
        });

        if (!mailer) console.log("Erro ao enviar o livro!");
    }

    private async updateStatus(statusData: SchedulingData) {
        const resultBook = await this.prisma.reservations.update({
            where: { id: statusData.id },
            data: { status: "LATE" }
        });

        const user = await this.prisma.users.findUnique({
            where: { id: statusData.userId }
        });

        if (user) {
            const score = user.score;
            await this.prisma.users.update({
                where: { id: statusData.userId },
                data: { score: score - 1 }
            });
        }
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
            bookIdList.push({ id: reservation.id ,bookId: reservation.book_id, userId: reservation.user_id, status: reservation.status });
        });

        if (bookIdList.length > 0) {
            for (const data of bookIdList) {
                if (data.status === "RESERVED") {
                    await this.updateStatus(data);
                } else {
                    await this.sendEmail(data.userId, data.bookId);
                }
            }
            const job = this.schedulerRegistry.getCronJob('handleCronJob');
            job.stop();
            console.log('Cron job parado após a execução.');
        }
    }
}
