import { Injectable } from "@nestjs/common";
import { CreateReservationDTO } from "./dto/create-reservation.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ReservationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateReservationDTO) {
        const { book_id, user_id } = data;
        const nowDate = new Date();
        
        nowDate.setDate(nowDate.getDate() + 15);
    
        const dueDate = nowDate.toJSON();
        const currentDate = new Date().toJSON();
        const quantityBooks = await this.prisma.reservations.findMany({
            where: {
                user_id
            }
        });

        if(quantityBooks.length === 3) throw new Error("");

        if(!book_id || !user_id) throw new Error("");

        return await this.prisma.reservations.create({
            data: {
                due_date: dueDate,
                reservation_date: currentDate,
                book_id,
                user_id
            }
        })
    }
}