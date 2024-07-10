import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { ReservationStatus as PrismaStatus } from "@prisma/client";
import { ReservationStatus } from "../../common/enums/reservation-status.enum";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ReservationService {
    private readonly MAX_BOOKS_PER_USER = 3;
    private readonly RESERVATION_PERIOD_DAYS = 15;

    constructor(private readonly prisma: PrismaService) {}

    private async getBook(bookId: number) {
        return this.prisma.books.findUnique({ where: { id: bookId } });
    }

    private async getUser(userId: number) {
        return this.prisma.users.findUnique({ where: { id: userId } });
    }

    private convertPrismaStatusToStatus(prismaStatus: PrismaStatus): ReservationStatus {
        switch (prismaStatus) {
            case "RESERVED":
                return ReservationStatus.Reserved;
            case "RETURNED":
                return ReservationStatus.Returned;
            case "LATE":
                return ReservationStatus.Late
            default:
                return ReservationStatus.Pending;
        }
    }

    private throwCustomException(message: string, status: HttpStatus) {
        throw new CustomException(false, message, status);
    }

    async create(book_id: number, user_id: number) {
        if (!book_id || !user_id) {
            this.throwCustomException("Livro ou Usuário não existe!", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const book = await this.getBook(book_id);
        const user = await this.getUser(user_id);

        if (!book || !user) {
            this.throwCustomException("Livro ou Usuário não encontrado!", HttpStatus.NOT_FOUND);
        }

        const penaltyEndDate = new Date(user.penalty_end_date);
        const now = new Date();

        if (now < penaltyEndDate) {
            this.throwCustomException("O usuário não pode fazer reserva!", HttpStatus.BAD_REQUEST);
        }

        const userReservations = await this.prisma.reservations.findMany({ where: { user_id } });
        if (userReservations.length >= this.MAX_BOOKS_PER_USER) {
            this.throwCustomException("O usuário atingiu o limite de livros!", HttpStatus.BAD_REQUEST);
        }

        const reservedBooksCount = await this.prisma.reservations.count({
            where: {
                book_id,
                AND: [
                    { status: "RESERVED" }
                ]
            }
        });

        if (reservedBooksCount >= book.quantity) {
            this.throwCustomException("O Livro em questão não está disponível!", HttpStatus.BAD_REQUEST);
        }

        const reservation = await this.prisma.reservations.create({
            data: {
                due_date: new Date(now.getTime() + this.RESERVATION_PERIOD_DAYS * 24 * 60 * 60 * 1000),
                reservation_date: now,
                book_id,
                user_id,
            },
        });

        if (!reservation) {
            this.throwCustomException("Erro ao registrar o livro!", HttpStatus.BAD_REQUEST);
        }

        return { success: true, message: "Livro registrado com sucesso!" };
    }

    async listUser(id: number) {
        const reservations = await this.prisma.reservations.findMany({
            where: { user_id: id },
            include: { book: true },
        });

        if (!reservations) {
            this.throwCustomException("Erro ao listar as reservas do usuário!", HttpStatus.BAD_REQUEST);
        }

        return reservations.map(reservation => ({
            id: reservation.id,
            status: this.convertPrismaStatusToStatus(reservation.status),
            due_date: reservation.due_date.toJSON(),
            reservation_date: reservation.reservation_date.toJSON(),
            book: {
                id: reservation.book.id,
                title: reservation.book.title,
            },
            user: null,
        }));
    }
}
