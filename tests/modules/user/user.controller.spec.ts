import { Test } from "@nestjs/testing";
import * as bcrypt from "bcrypt";
import { UserController } from "../../../src/modules/user/user.controller";
import { UserService } from "../../../src/modules/user/user.service";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { userList } from "../../../mocks/user-list.mock";

describe("User Controller", ()=>{
    let userService: UserService;
    let userController: UserController;
    let prismaService: PrismaService;

    beforeEach(async ()=> {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, PrismaService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe("Create", ()=> {
        it("Adicionar um novo usuário no banco de dados", async ()=> {
            const salt = await bcrypt.genSalt();
            const result = { success: true, message: "Usuário registrado" };

            const body = { 
                name: "User 1",
                email: "user1@example.com",
                password: await bcrypt.hash("password1", salt),
                cep: "59145720",
                city: "Parnamirim",
                neighborhood: "Passagem de Areia",
                number: "1859",
                street: "Rua Capitão Martinho Machado",
                uf: "RN"
            };

            jest.spyOn(userService, "create").mockImplementation(async ()=> result);
            expect(await userController.create(body)).toBe(result);
        });
    });

    describe("List", ()=>{
        it("Apresentar todos os usuários", async ()=> {
            const result = userList;

            jest.spyOn(userService, "list").mockImplementation(async ()=> result);
            expect(await userController.list()).toBe(result);
        });
    });

    describe("Show",()=>{
        it("Apresentar um usuário por index", async ()=> {
            const result = userList[0];

            jest.spyOn(userService, "show").mockImplementation(async ()=> result);
            expect(await userController.read(1)).toBe(result);
        });
    });

    describe("Update", ()=>{
        it("Atualizar os dados do usuário", async ()=> {
            const result = { success: true, message: "Usuário atualizado!" };

            const body = { 
                "name": "Lucas S exemplo",
                "email": "exemplo@gmail.com",
                "birth_at": "1998-11-07T00:00:00.000Z"
            };

            jest.spyOn(userService, "update").mockImplementation(async ()=> result);
            expect(await userController.update(body, 1)).toBe(result);
        });
    });

    describe("Update Partial", ()=>{
        it("Atualizar os dados do usuário de forma parcial", async ()=> {
            const result = { success: true, message: "Usuário atualizado!" };

            const body = {
                "name": "Luquinhas"
            };

            jest.spyOn(userService, "updatePatch").mockImplementation(async ()=> result);
            expect(await userController.updatePartial(body, 2)).toBe(result);
        });
    });

    describe("Delete", ()=> {
        it("Deletar um usuário", async ()=>{
            const result = { success: true, message: "Usuário deletado!" };

            jest.spyOn(userService, "delete").mockImplementation(async ()=> result);
            expect(await userController.delete(1)).toBe(result);
        });
    });
});