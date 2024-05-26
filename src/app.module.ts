import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { BookModule } from "./modules/book/book.module";
import { AuthorModule } from "./modules/author/author.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserModule } from "./modules/user/user.module";
import { AppController } from "./app.controller";

@Module({
  imports: [BookModule, AuthorModule, CategoryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
