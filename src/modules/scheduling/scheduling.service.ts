import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { PrismaService } from "../../prisma/prisma.service";
import { SchedulingData } from "./dto/scheduling-data.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class SchedulingService {
    private readonly logger = new Logger(SchedulingService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly mailer: MailerService
    ) {}

    private async sendEmail(userId: number, bookId: number) {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: userId } });
            const book = await this.prisma.books.findUnique({ where: { id: bookId } });

            if (!user || !book) {
                this.logger.warn(`User or book not found. UserId: ${userId}, BookId: ${bookId}`);
                return;
            }

            await this.mailer.sendMail({
                subject: "Devolução do Livro",
                to: user.email,
                template: "return-book",
                context: {
                    name: user.name,
                    book: book.title,
                }
            });

            await this.prisma.users.update({
                where: { id: userId },
                data: { score: user.score - 1 }
            });

            this.logger.log(`Email sent to ${user.email} regarding book ${book.title}`);
        } catch (error) {
            this.logger.error(`Failed to send email to UserId: ${userId}, BookId: ${bookId}`, error.stack);
        }
    }

    private async updateStatus(statusData: SchedulingData) {
        try {
            await this.prisma.reservations.update({
                where: { id: statusData.id },
                data: { status: "LATE" }
            });

            const user = await this.prisma.users.findUnique({ where: { id: statusData.userId } });

            if (user) {
                await this.prisma.users.update({
                    where: { id: statusData.userId },
                    data: { score: user.score - 1 }
                });
                this.logger.log(`Updated status to LATE and reduced score for UserId: ${statusData.userId}`);
            } else {
                this.logger.warn(`User not found. UserId: ${statusData.userId}`);
            }
        } catch (error) {
            this.logger.error(`Failed to update status for SchedulingData: ${JSON.stringify(statusData)}`, error.stack);
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_2AM, {
        name: 'handleCronJob',
    })
    async handleCron() {
        this.logger.log('Cron job started.');
        const bookIdList: SchedulingData[] = [];
        
        try {
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
                bookIdList.push({
                    id: reservation.id,
                    bookId: reservation.book_id,
                    userId: reservation.user_id,
                    status: reservation.status
                });
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
                this.logger.log('Cron job stopped after execution.');
            } else {
                this.logger.log('No reservations found that meet the criteria.');
            }
        } catch (error) {
            this.logger.error('Failed to execute cron job', error.stack);
        }
    }
}