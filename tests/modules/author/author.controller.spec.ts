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

    describe("Procure Todos", ()=>{
        it("Apresentar todos os autores", async ()=> {
            const result = authorList;

            jest.spyOn(authorService, "list").mockImplementation(async ()=> result);
            expect(await authorController.list()).toBe(result);
        });
    });
});