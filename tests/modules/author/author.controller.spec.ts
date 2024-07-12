import { Test } from "@nestjs/testing";
import { PrismaService } from "./../../../src/prisma/prisma.service";
import { AuthorController } from "../../../src/modules/author/author.controller";
import { AuthorService } from "../../../src/modules/author/author.service";
import { authorList } from "../../../mocks/author-list.mock";

describe("Author Controller", ()=>{
    let authorService: AuthorService;
    let authorController: AuthorController;
    let prismaService: PrismaService;

    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            controllers: [AuthorController],
            providers: [AuthorService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        authorService = moduleRef.get<AuthorService>(AuthorService);
        authorController = moduleRef.get<AuthorController>(AuthorController);
    });

    describe("Create", ()=> {
        it("Adicionar um novo autor no banco de dados", async ()=> {
            const result = {
                success: true,
                message: "Autor registrado com sucesso!"
            };

            const body = {
                "name": "Deus está mais que vivo",
                "biography": "O divino é eterno"
            };

            jest.spyOn(authorService, "create").mockImplementation(async ()=> result);
            expect(await authorController.create(body)).toBe(result);
        });
    });

    describe("List", ()=>{
        it("Apresentar todos os autores", async ()=> {
            const result = authorList;

            jest.spyOn(authorService, "list").mockImplementation(async ()=> result);
            expect(await authorController.list()).toBe(result);
        });
    });

    describe("Show",()=>{
        it("Apresentar um autor por index", async ()=> {
            const result = authorList[0];

            jest.spyOn(authorService, "show").mockImplementation(async ()=> result);
            expect(await authorController.read(1)).toBe(result);
        });
    });

    describe("Update", ()=>{
        it("Atualizar os dados do autor", async ()=> {
            const result = {
                success: true,
                message: "Informações do autor atualizado!"
            };

            const body = {
                "name": "João S Leoncio",
                "biography": "João Silva nasceu em 15 de junho de 1985, na cidade de São Paulo, Brasil. Desde cedo, João demonstrou uma paixão por tecnologia e engenharia, passando grande parte de sua infância desmontando e montando aparelhos eletrônicos e computadores."
            };

            jest.spyOn(authorService, "update").mockImplementation(async ()=> result);
            expect(await authorController.update(body, 1)).toBe(result);
        });
    });

    describe("Update Partial", ()=>{
        it("Atualizar os dados do autor de forma parcial", async ()=> {
            const result = {
                success: true,
                message: "Informações do autor atualizado!"
            };

            const body = {
                "biography": "A verdade e a Luz!"
            };

            jest.spyOn(authorService, "updatePatch").mockImplementation(async ()=> result);
            expect(await authorController.updatePartial(body, 1)).toBe(result);
        });
    });

    describe("Delete", ()=> {
        it("Deletar um autor", async ()=>{
            const result = {
                success: true,
                message: "Autor deletado com sucesso!"
            };

            jest.spyOn(authorService, "delete").mockImplementation(async ()=> result);
            expect(await authorController.delete(1)).toBe(result);
        });
    });
});