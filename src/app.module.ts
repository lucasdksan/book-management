import { Module } from "@nestjs/common";
import { EnvConfigModule } from "./shared/infrastructure/env-config/env-config.module";
import { BookModule } from "./book/infrastructure/book.module";

@Module({
  imports: [EnvConfigModule, BookModule],
})
export class AppModule {}
