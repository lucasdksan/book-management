import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "../../prisma/prisma.module";
import { UserIdCheckMiddleware } from "../../common/middlewares/user-id-check.middleware";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: "users/:id",
            method: RequestMethod.ALL
        });
    }
}