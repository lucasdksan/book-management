import { Test, TestingModule } from "@nestjs/testing";
import { EnvConfigService } from "../../env-config.service";
import { EnvConfigModule } from "../../env-config.module";

describe("EnvConfigService unit tests", () => {
    let sut: EnvConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EnvConfigModule.forRoot()],
            providers: [EnvConfigService],
        }).compile();

        sut = module.get<EnvConfigService>(EnvConfigService);
    });

    it("should be defined", () => {
        expect(sut).toBeDefined();
    });

    it("should return the variable PORT", () => {
        expect(sut.getAppPort()).toBe(3000);
    });

    it("should return the variable NODE_ENV", () => {
        expect(sut.getNodeEnv()).toBe("test");
    });

    it("should return the variable DATABASE_URL", () => {
        expect(sut.getDatabaseURL()).toBe("http://exemplo.com.br");
    });

    it("should return the variable JWT_Secret", () => {
        expect(sut.getJwtSecret()).toBe("MY_test_SECRET");
    });

    it("should return the variable Jwt EXPIRES in Seconds", () => {
        expect(sut.getJwtExpiresInSeconds()).toBe(86400);
    });

    it("should return the variable MAILER_EMAIL", () => {
        expect(sut.getMailerEmail()).toBe("exemplo@gmail.com");
    });

    it("should return the variable MAILER_PASSWORD", () => {
        expect(sut.getMailerPassword()).toBe("12345");
    });

    it("should return the variable MAILER_HOST", () => {
        expect(sut.getMailerHost()).toBe("testE");
    });

    it("should return the variable MAILER_PORT", () => {
        expect(sut.getMailerPort()).toBe(1234);
    });
});