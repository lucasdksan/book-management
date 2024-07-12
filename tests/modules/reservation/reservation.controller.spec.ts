import { Test } from "@nestjs/testing";
import { ReservationController } from "../../../src/modules/reservation/reservation.controller";
import { ReservationService } from "../../../src/modules/reservation/reservation.service";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { reservationList } from "../../../mocks/reservation-list.mock";

describe("Reservation Controller", ()=>{
    let prismaService: PrismaService;
    let reservationService: ReservationService;
    let reservationController: ReservationController;

    beforeEach(async ()=> {
        const moduleRef = await Test.createTestingModule({
            controllers: [ReservationController],
            providers: [ReservationService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        reservationService = moduleRef.get<ReservationService>(ReservationService);
        reservationController = moduleRef.get<ReservationController>(ReservationController);
    });

    describe("Reservation", ()=>{
        it("Fazer a reserva do livro", async ()=>{
            const result = { success: true, message: "Livro registrado com sucesso!" };

            jest.spyOn(reservationService, "create").mockImplementation(async ()=> result);
            expect(await reservationController.create(1, { id: 1, email: "lokasmega@gmail.com", role: "USER" })).toBe(result);
        });
    });

    describe("Reservation List", ()=>{
        it("Lista de Reservas do Usuário", async ()=>{
            const result = reservationList;

            jest.spyOn(reservationService, "listUser").mockImplementation(async ()=> result);
            expect(await reservationController.listUser({ id: 1, email: "lokasmega@gmail.com", role: "USER" })).toBe(result);
        });
    });
});