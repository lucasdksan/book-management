import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { env } from "../common/environments/env.environment";
import { LocalStrategy } from "../common/strategies/local.strategy";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { UserModule } from "../modules/user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        PrismaModule, 
        PassportModule,
        JwtModule.register({
            secret: env.JWT_SECRET,
            signOptions: { 
                expiresIn: "2 days",
                issuer: "login",
                audience: "users"
            },
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}