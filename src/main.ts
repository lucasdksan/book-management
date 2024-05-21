import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT ? env.PORT : 3000;
  await app.listen(port);
}
bootstrap();
