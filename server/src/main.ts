import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

//TODO: SSL Сертификат

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableCors();
  app.enableCors({
    origin: [
      'http://localhost:3001/*',
      'http://localhost:3001',
      'http://localhost:3001/',
    ],
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads')); //Можно убрать

  await app.listen(3000);
}

bootstrap();
