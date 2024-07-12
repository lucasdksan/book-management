import { Test } from "@nestjs/testing";
import { CategoryController } from "../../../src/modules/category/category.controller";
import { CategoryService } from "../../../src/modules/category/category.service";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { categoryList } from "../../../mocks/category-list.mock";

describe("Category Controller", ()=> {
    let categoryService: CategoryService;
    let categoryController: CategoryController;
    let prismaService: PrismaService;

    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [CategoryService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        categoryService = moduleRef.get<CategoryService>(CategoryService);
        categoryController = moduleRef.get<CategoryController>(CategoryController);
    });

    describe("Create", ()=> {
        it("Adicionar um novo categoria no banco de dados", async ()=> {
            const result = { success: true, message: "Categoria criada com sucesso!" };

            const body = { 
                "name": "Engenharia Software"
            };

            jest.spyOn(categoryService, "create").mockImplementation(async ()=> result);
            expect(await categoryController.create(body)).toBe(result);
        });
    });

    describe("List", ()=>{
        it("Apresentar todos os categorias", async ()=> {
            const result = categoryList;

            jest.spyOn(categoryService, "list").mockImplementation(async ()=> result);
            expect(await categoryController.list()).toBe(result);
        });
    });

    describe("Show",()=>{
        it("Apresentar um categoria por index", async ()=> {
            const result = categoryList[0];

            jest.spyOn(categoryService, "show").mockImplementation(async ()=> result);
            expect(await categoryController.read(1)).toBe(result);
        });
    });

    describe("Update", ()=>{
        it("Atualizar os dados do categoria", async ()=> {
            const result = { success: true, message: "Categoria atualizada com sucesso!" };

            const body = { "name": "category 1 ininity" };

            jest.spyOn(categoryService, "update").mockImplementation(async ()=> result);
            expect(await categoryController.update(body, 1)).toBe(result);
        });
    });

    describe("Update Partial", ()=>{
        it("Atualizar os dados do categoria de forma parcial", async ()=> {
            const result = { success: true, message: "Categoria atualizada com sucesso!" };

            const body = {
                "name": "category 1 ininity plus"
            };

            jest.spyOn(categoryService, "updatePatch").mockImplementation(async ()=> result);
            expect(await categoryController.updatePartial(body, 2)).toBe(result);
        });
    });

    describe("Delete", ()=> {
        it("Deletar um categoria", async ()=>{
            const result = { success: true, message: "Categoria deletada com sucesso!" };

            jest.spyOn(categoryService, "delete").mockImplementation(async ()=> result);
            expect(await categoryController.delete(1)).toBe(result);
        });
    });
});