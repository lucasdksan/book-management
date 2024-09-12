import { Module } from "@nestjs/common";
import { EnvConfigModule } from "./shared/infrastructure/env-config/env-config.module";
import { BookModule } from "./book/infrastructure/book.module";
import { DatabaseModule } from "./shared/infrastructure/database/database.module";

@Module({
  imports: [EnvConfigModule, BookModule, DatabaseModule],
})
export class AppModule {}
