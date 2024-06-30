import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { BookModule } from "./modules/book/book.module";
import { AuthorModule } from "./modules/author/author.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserModule } from "./modules/user/user.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { ScheduleModule } from "@nestjs/schedule";
import { SchedulingModule } from "./modules/scheduling/scheduling.module";
import { SchedulingService } from "./modules/scheduling/scheduling.service";

@Module({
  imports: [BookModule, AuthorModule, CategoryModule, UserModule, ReservationModule, ScheduleModule.forRoot(), SchedulingModule],
  controllers: [AppController],
  providers: [AppService, SchedulingService],
})
export class AppModule {}
