import { Test } from "@nestjs/testing";
import { BookService } from "../../../src/modules/book/book.service";
import { BookController } from "../../../src/modules/book/book.controller";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { bookList } from "../../../mocks/book-list.mock";

describe("Book Controller", ()=> {
    let bookService: BookService;
    let bookController: BookController;
    let prismaService: PrismaService;

    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            controllers: [BookController],
            providers: [BookService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        bookService = moduleRef.get<BookService>(BookService);
        bookController = moduleRef.get<BookController>(BookController);
    });

    describe("Create", ()=> {
        it("Adicionar um novo livro no banco de dados", async ()=> {
            const result = { success: true, message: "Livro registrado com sucesso!" };

            const body = { 
                title: "Como desistir em uma semana", 
                quantity: 10, 
                publication_date: new Date().toJSON(), 
                price: 100, 
                description: "Um livro completo de como desistir da engenharia em uma semana", 
                author_id: 1, 
                categorie_id: 1 
            };

            jest.spyOn(bookService, "create").mockImplementation(async ()=> result);
            expect(await bookController.create(body)).toBe(result);
        });
    });

    describe("List", ()=>{
        it("Apresentar todos os livros", async ()=> {
            const result = bookList;

            jest.spyOn(bookService, "list").mockImplementation(async ()=> result);
            expect(await bookController.list()).toBe(result);
        });
    });

    describe("Show",()=>{
        it("Apresentar um livro por index", async ()=> {
            const result = bookList[0];

            jest.spyOn(bookService, "show").mockImplementation(async ()=> result);
            expect(await bookController.read(1)).toBe(result);
        });
    });

    describe("Update", ()=>{
        it("Atualizar os dados do livro", async ()=> {
            const result = { success: true, message: "Livro atualizado!" };

            const body = {
                title: "Como desistir em uma semana 10", 
                quantity: 10, 
                publication_date: new Date().toJSON(), 
                price: 100, 
                description: "Um livro completo de como desistir da engenharia em uma semana 10", 
                author_id: 1, 
                categorie_id: 1 
            };

            jest.spyOn(bookService, "update").mockImplementation(async ()=> result);
            expect(await bookController.update(body, 1)).toBe(result);
        });
    });

    describe("Update Partial", ()=>{
        it("Atualizar os dados do livro de forma parcial", async ()=> {
            const result = { success: true, message: "Livro atualizado!" }

            const body = {
                description: "Um livro completo de como desistir da engenharia em uma semana 100",
            };

            jest.spyOn(bookService, "updatePatch").mockImplementation(async ()=> result);
            expect(await bookController.updatePartial(body, 1)).toBe(result);
        });
    });

    describe("Delete", ()=> {
        it("Deletar um livro", async ()=>{
            const result = { success: true, message: "Livro deletado!" };

            jest.spyOn(bookService, "delete").mockImplementation(async ()=> result);
            expect(await bookController.delete(1)).toBe(result);
        });
    });
});