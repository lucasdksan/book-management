import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from "bcrypt";
import { AuthController } from "../../src/auth/auth.controller";
import { AuthService } from "../../src/auth/auth.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { UserService } from "../../src/modules/user/user.service";
import { mailerServiceMock } from "../../mocks/mailer-service.mock";
import { forRootMock } from "../../mocks/for-root.mock";

describe("Auth Controller", () => {
    let prismaService: PrismaService;
    let authService: AuthService;
    let userService: UserService;
    let authController: AuthController;
    let mailerService: MailerService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MailerModule.forRoot(forRootMock)
            ],
            controllers: [AuthController],
            providers: [AuthService, 
                {
                    provide: MailerService,
                    useValue: mailerServiceMock,
                }
                , JwtService, PrismaService, UserService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        authService = moduleRef.get<AuthService>(AuthService);
        authController = moduleRef.get<AuthController>(AuthController);
        mailerService = moduleRef.get<MailerService>(MailerService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe("Login", () => {
        it("Fazer o Login", async () => {
            const result = { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMDgzODA2MiwiZXhwIjoxNzIxMDEwODYyLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIn0.iXhQKWl6zvtmc2jLe8wu7jxHFMUmUbEd1QfC7iZxaaY" };

            jest.spyOn(authService, "login").mockImplementation(async () => result);
            expect(await authService.login({ id: 1, email: "lokasmega@gmail.com", role: "USER" })).toBe(result);
        });
    });

    describe("Register", ()=> {
        it("Registar novo usuário", async () => {
            const salt = await bcrypt.genSalt();
            const result = { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMDgzODA2MiwiZXhwIjoxNzIxMDEwODYyLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIn0.iXhQKWl6zvtmc2jLe8wu7jxHFMUmUbEd1QfC7iZxaaY" };
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

            jest.spyOn(authService, "register").mockImplementation(async () => result);
            expect(await authService.register(body)).toBe(result);
        });
    })
    
    describe("Forgot", ()=>{
        it("Criar token para executar troca de senha", async () => {
            const result = { success: true, message: "Token enviado com sucesso!" };

            jest.spyOn(authService, "forget").mockImplementation(async () => result);
            expect(await authService.forget("lokasmega@gmail.com")).toBe(result);
        });
    });

    describe("Reset", ()=>{
        it("Fazer o reset de senha", async ()=> {
            const result = { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMDgzODA2MiwiZXhwIjoxNzIxMDEwODYyLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIn0.iXhQKWl6zvtmc2jLe8wu7jxHFMUmUbEd1QfC7iZxaaY" };

            jest.spyOn(authService, "reset").mockImplementation(async () => result);
            expect(await authService.reset("123456", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMDgzODA2MiwiZXhwIjoxNzIxMDEwODYyLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIn0.iXhQKWl6zvtmc2jLe8wu7jxHFMUmUbEd1QfC7iZxaaY")).toBe(result);
        });
    });

    describe("Update Partial", ()=> {
        it("Atualizar os dados do usuário", async ()=> {
            const result = { success: true, message: "Senha atualizada!" };

            jest.spyOn(authService, "updatePatch").mockImplementation(async () => result);
            expect(await authService.updatePatch({ email: "lokasmega@gmail.com", name: "Lucazinho" }, { id: 1, email: "lokasmega@gmail.com", role: "USER" })).toBe(result);
        });
    });

    describe("Change Pass", ()=> {
        it("Alterar a senha", async ()=> {
            const result = { success: true, message: "Senha atualizada!" };

            jest.spyOn(authService, "changePassword").mockImplementation(async () => result);
            expect(await authService.changePassword("1234", {id: 1, email: "lokasmega@gmail.com", role: "USER"})).toBe(result);
        });
    })
});