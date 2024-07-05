import { forwardRef, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { BookModule } from "./modules/book/book.module";
import { AuthorModule } from "./modules/author/author.module";
import { CategoryModule } from "./modules/category/category.module";
import { UserModule } from "./modules/user/user.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { env } from "./environment/env";
import { SchedulingService } from "./modules/scheduling/scheduling.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    BookModule, 
    AuthorModule, 
    CategoryModule, 
    ReservationModule, 
    ScheduleModule.forRoot(), 
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
