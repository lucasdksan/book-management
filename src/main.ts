import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { env } from "./common/environments/env.environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT ? env.PORT : 3000;
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(port);
}
bootstrap();
