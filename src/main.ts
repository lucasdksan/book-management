import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { env } from "./common/environments/env.environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT ? env.PORT : 3000;

  const config = new DocumentBuilder()
    .setTitle("Book Management")
    .setDescription("API para gerenciar uma biblioteca")
    .setVersion("0.0.1")
    .addTag("Books")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(port);
}
bootstrap();
