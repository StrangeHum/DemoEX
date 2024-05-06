import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//TODO: SSL Сертификат

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableCors({
    origin: [
      'http://localhost:3001/*',
      'http://localhost:3001',
      'http://localhost:3001/',
    ],
  });
  await app.listen(3000);
}

bootstrap();
