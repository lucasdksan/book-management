import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { BookModule } from "./modules/book/book.module";
import { AuthorModule } from "./modules/author/author.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserModule } from "./modules/user/user.module";
import { ReservationModule } from "./modules/reservation/reservation.module";

@Module({
  imports: [BookModule, AuthorModule, CategoryModule, UserModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
