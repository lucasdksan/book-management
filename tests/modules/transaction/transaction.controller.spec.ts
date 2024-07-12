import { Test } from "@nestjs/testing";
import { TransactionController } from "../../../src/modules/transaction/transaction.controller";
import { TransactionService } from "../../../src/modules/transaction/transaction.service";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { transactionBookList, transactionList, transactionUserList } from "../../../mocks/transaction-list.mock";

describe("Transaction Controller", ()=> {
    let prismaService: PrismaService;
    let transactionController: TransactionController;
    let transactionService: TransactionService;

    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [TransactionService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        transactionService = moduleRef.get<TransactionService>(TransactionService);
        transactionController = moduleRef.get<TransactionController>(TransactionController);
    });

    describe("Check Out", ()=>{
        it("Liberar a saída de um livro", async ()=>{
            const result = { success: true, message: "Reserva autorizada!" };

            jest.spyOn(transactionService, "registerBook").mockImplementation(async ()=> result);
            expect(await transactionController.registerBook(1)).toBe(result);
        });
    });

    describe("Check In", ()=>{
        it("Registrar o retorno do livro", async ()=>{
            const result = { success: true, message: "Livro recebido!" };

            jest.spyOn(transactionService, "returnBook").mockImplementation(async ()=> result);
            expect(await transactionController.returnBook(1, { bookId: 1, userId: 1 })).toBe(result);
        });
    });

    describe("List Reservations", ()=>{
        it("Listar todas as reservas", async ()=>{
            const result = transactionList;

            jest.spyOn(transactionService, "list").mockImplementation(async ()=> result);
            expect(await transactionController.list()).toBe(result);
        });
    });

    describe("List Book", ()=>{
        it("Lista de Livros Reservados ou/e enviados", async ()=> {
            const result = transactionBookList;

            jest.spyOn(transactionService, "listBook").mockImplementation(async ()=> result);
            expect(await transactionController.listBook(1)).toBe(result);
        });
    });

    describe("List User", ()=>{
        it("Lista de Usuários que fizeram reservas", async ()=> {
            const result = transactionUserList;

            jest.spyOn(transactionService, "listUser").mockImplementation(async ()=> result);
            expect(await transactionController.listUser(1)).toBe(result);
        });
    });
});