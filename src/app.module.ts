import { forwardRef, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { BookModule } from "./modules/book/book.module";
import { AuthorModule } from "./modules/author/author.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserModule } from "./modules/user/user.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { SchedulingService } from "./modules/scheduling/scheduling.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { env } from "./common/environments/env.environment";
import { SearchModule } from "./modules/search/search.module";

@Module({
  imports: [
    PrismaModule,
    BookModule, 
    AuthorModule, 
    CategoryModule, 
    ReservationModule, 
    ScheduleModule.forRoot(),
    TransactionModule, 
    SearchModule,
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: env.MAILER_HOST,
        port: parseInt(env.MAILER_PORT),
        auth: {
          user: env.MAILER_EMAIL,
          pass: env.MAILER_PASSWORD
        }
      },
      defaults: {
        from: `"nest-modules" <modules@nestjs.com>`,
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SchedulingService],
})
export class AppModule {}
