import * as request from "supertest";
import * as bcrypt from "bcrypt";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { PrismaService } from "../../../src/prisma/prisma.service";
import { AppModule } from "../../../src/app.module";

describe("Authors E2E", () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let token: string;

    beforeAll(async () => {
        const salt = await bcrypt.genSalt();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        prisma = app.get<PrismaService>(PrismaService);

        const userCredentials = {
            name: "User 1",
            email: "user1@example.com",
            password: await bcrypt.hash("password1", salt),
            role: "ADMIN",
            cep: "59145720",
            city: "Parnamirim",
            neighborhood: "Passagem de Areia",
            number: "1859",
            street: "Rua Capitão Martinho Machado",
            uf: "RN"
        };

        await prisma.users.upsert({
            where: { email: userCredentials.email },
            update: {},
            create: {
                cep: userCredentials.cep,
                city: userCredentials.city,
                email: userCredentials.email,
                name: userCredentials.name,
                neighborhood: userCredentials.neighborhood,
                number: userCredentials.number,
                password: userCredentials.password,
                street: userCredentials.street,
                uf: userCredentials.uf,
                role: "ADMIN",
            }
        });

        const response = await request(app.getHttpServer())
                            .post("/auth/login")
                            .send({ email: userCredentials.email, password: userCredentials.password })
                            .expect(HttpStatus.OK);

        token = response.body.access_token;
    });

    afterAll(async () => {
        await app.close();
    });

    describe("End Point para criar novo Autor", () => {
        it("/authors (POST) should create a new author", async () => {
            const createAuthorDto = {
                name: "John Doe",
                biography: "A famous author",
            };

            const response = await request(app.getHttpServer())
                .post("/authors")
                .set("Authorization", `Bearer ${token}`)
                .send(createAuthorDto)
                .expect(HttpStatus.CREATED);

            expect(response.body).toMatchObject({
                success: true,
                message: "Autor registrado com sucesso!",
            });
        });
    });

    describe("End Point para lstar todos os Autores", () => { });

    describe("End Point para apresentar um Autor por index", () => { });

    describe("End Point para atualizar um Autor", () => { });

    describe("End Point para atualizar um Autor parcialmente", () => { });

    describe("End Point para deletar um Autor", () => { });
});