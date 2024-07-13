import { Test } from "@nestjs/testing";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { SearchService } from "../../../src/modules/search/search.service";
import { SearchController } from "../../../src/modules/search/search.controller";
import { searchList } from "../../../mocks/search-list.mock";

describe("Search Controller", ()=> {
    let prismaService: PrismaService;
    let searchService: SearchService;
    let searchController: SearchController;

    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            controllers: [SearchController],
            providers: [SearchService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        searchController = moduleRef.get<SearchController>(SearchController);
        searchService = moduleRef.get<SearchService>(SearchService);
    });

    describe("Search", ()=>{
        it("Fazer uma pesquisa de um livro", async ()=>{
            const result = searchList;

            jest.spyOn(searchService, "searchBooks").mockImplementation(async ()=> result);
            expect(await searchController.searchBooks({ title: "Book 1" })).toBe(result);
        });
    });
});