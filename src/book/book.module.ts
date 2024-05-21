import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService],
})
export class BookModule {}