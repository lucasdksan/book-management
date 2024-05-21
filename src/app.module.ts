import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [BookModule, AuthorModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
