import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ReservationStatus as PrismaStatus } from "@prisma/client";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { ReservationStatus } from "../../common/enums/reservation-status.enum";
import { ViewTransactionDTO } from "./dto/view-transaction.dto";
import { CheckInDTO } from "./dto/check-in.dto";

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }

    private async getUser(userId: number) {
        const user = await this.prisma.users.findUnique({
            where: { id: userId }
        });

        return user;
    }

    private convertPrismaStatusToStatus(prismaStatus: PrismaStatus): ReservationStatus {
        if(prismaStatus === "RESERVED") {
            return ReservationStatus.Reserved;
        } else if(prismaStatus === "RETURNED"){
            return ReservationStatus.Returned;
        } else if(prismaStatus === "LATE") {
            return ReservationStatus.Late;
        } else {
            return ReservationStatus.Pending;
        }
    }

    async registerBook(id: number){
        const reservation = await this.prisma.reservations.findUnique({
            where: { id }
        });

        if(!reservation) throw new CustomException(false, "Reserva não existe!", HttpStatus.NOT_FOUND);

        const result = await this.prisma.reservations.update({
            where: { id },
            data: { status: "RESERVED" }
        });

        if(!result) throw new CustomException(false, "Erro ao permitir reserva!", HttpStatus.UNAUTHORIZED);

        return { success: true, message: "Reserva autorizada!" };
    }

    async returnBook(id: number, body: CheckInDTO){
        const { bookId, userId } = body;
        const result = await this.prisma.reservations.updateMany({
            where: {
                id,
                user_id: userId,
                book_id: bookId
            },
            data: {
                status: "RETURNED"
            }
        });

        const { penalty_end_date, score } = await this.getUser(userId);

        if(!penalty_end_date) {
            await this.prisma.users.update({
                where: {
                    id: userId
                },
                data: {
                    score: score + 2,
                    penalty_end_date: null
                }
            });
        }

        if(!result) throw new CustomException(false, "Erro ao trocar o status do livro!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Livro recebido!" };
    }

    async list(){
        const reservations = await this.prisma.reservations.findMany({
            include: {
                book: true,
                user: true
            }
        });

        if(!reservations) throw new CustomException(false, "Erro ao registrar a reserva!", HttpStatus.BAD_REQUEST);
        
        const viewReservationsDTO = reservations.map((reservation, index)=> {
            let viewReservationDTO: ViewTransactionDTO = {
                id: reservation.id,
                status: this.convertPrismaStatusToStatus(reservation.status),
                due_date: reservation.due_date.toJSON(),
                reservation_date: reservation.reservation_date.toJSON(),
                book: {
                    id: reservation.book.id,
                    title: reservation.book.title
                },
                user: {
                    id: reservation.user.id,
                    email: reservation.user.email,
                    name: reservation.user.name
                }
            }

            return viewReservationDTO;
        });

        return viewReservationsDTO;
    }

    async listUser(id: number){
        const reservations = await this.prisma.reservations.findMany({
            where: {
                user_id: id
            },
            include: {
                book: true
            }
        });

        if(!reservations) throw new CustomException(false, "Erro ao listar as reservas do usuário!", HttpStatus.BAD_REQUEST);

        const viewReservationsDTO = reservations.map((reservation)=> {
            let viewReservationDTO: ViewTransactionDTO = {
                id: reservation.id,
                status: this.convertPrismaStatusToStatus(reservation.status),
                due_date: reservation.due_date.toJSON(),
                reservation_date: reservation.reservation_date.toJSON(),
                book: {
                    id: reservation.book.id,
                    title: reservation.book.title
                },
                user: null
            }

            return viewReservationDTO;
        });

        return viewReservationsDTO;
    }

    async listBook(id: number) {
        const reservations = await this.prisma.reservations.findMany({
            where: {
                book_id: id
            },
            include: {
                user: true
            }
        });

        if(!reservations) throw new CustomException(false, "Erro ao listar os livros registrados!", HttpStatus.BAD_REQUEST);

        const viewReservationsDTO = reservations.map((reservation)=> {
            let viewReservationDTO: ViewTransactionDTO = {
                id: reservation.id,
                status: this.convertPrismaStatusToStatus(reservation.status),
                due_date: reservation.due_date.toJSON(),
                reservation_date: reservation.reservation_date.toJSON(),
                book: null,
                user: {
                    id: reservation.user.id,
                    email: reservation.user.email,
                    name: reservation.user.name
                }
            }

            return viewReservationDTO;
        });

        return viewReservationsDTO;
    }
}