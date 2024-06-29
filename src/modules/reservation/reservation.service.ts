import { HttpStatus, Injectable } from "@nestjs/common";
import { ReservationStatus as PrismaStatus } from "@prisma/client";
import { CreateReservationDTO } from "./dto/create-reservation.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { ViewReservationDTO } from "./dto/view-reservation.dto";
import { ReservationStatus } from "../../common/enums/reservation-status.enum";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Injectable()
export class ReservationService {
    constructor(private readonly prisma: PrismaService) { }

    private async getQuantityBook(bookId: number){
        const quantity = await this.prisma.books.findUnique({
            where: { id: bookId }
        });

        return quantity.quantity;
    }

    private convertPrismaStatusToStatus(prismaStatus: PrismaStatus): ReservationStatus {
        if(prismaStatus === "RESERVED") {
            return ReservationStatus.Reserved;
        } else if(prismaStatus === "RETURNED"){
            return ReservationStatus.Returned;
        } else {
            return ReservationStatus.Late;
        }
    }

    async create(data: CreateReservationDTO) {
        const { book_id, user_id } = data;
        const nowDate = new Date();
        
        nowDate.setDate(nowDate.getDate() + 15);
        
        const dueDate = nowDate.toJSON();
        const currentDate = new Date().toJSON();

        if(!book_id || !user_id) throw new CustomException(false, "Livro ou Usuário não existe!", HttpStatus.UNPROCESSABLE_ENTITY);

        const quantity = await this.getQuantityBook(book_id);
        const quantityBooks = await this.prisma.reservations.findMany({
            where: { user_id }
        });

        const quantityBook = await this.prisma.reservations.findMany({
            where: {
                book_id,
                AND: [
                    { status: "RESERVED" }
                ]
            }
        });

        if(quantityBooks.length === 3) throw new CustomException(false, "O usuário atingiu o limite de livros!", HttpStatus.BAD_REQUEST);
        if(quantity === quantityBook.length) throw new CustomException(false, "O Livro em questão não está disponível!", HttpStatus.BAD_REQUEST);

        const reservationCreate = await this.prisma.reservations.create({
            data: {
                due_date: dueDate,
                reservation_date: currentDate,
                book_id,
                user_id
            }
        });

        if(!reservationCreate) throw new CustomException(false, "Erro ao registrar o livro!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Livro registrado com sucesso!" };
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
            let viewReservationDTO: ViewReservationDTO = {
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
            let viewReservationDTO: ViewReservationDTO = {
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
            let viewReservationDTO: ViewReservationDTO = {
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

    async returnedBook(bookId: number, userId: number){
        const result = await this.prisma.reservations.updateMany({
            where: {
                user_id: userId,
                book_id: bookId
            },
            data: {
                status: "RETURNED"
            }
        });

        if(!result) throw new CustomException(false, "Erro ao trocar o status do livro!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Livro recebido!" };
    }
}