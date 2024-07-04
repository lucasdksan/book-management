import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../environment/env";
import { LocalStrategy } from "../common/strategies/local.strategy";
import { JwtStrategy } from "../common/strategies/jwt.strategy";

@Module({
    imports: [
        PrismaModule, 
        PassportModule,
        JwtModule.register({
            secret: env.JWT_SECRET,
            signOptions: { expiresIn: "2 days" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}