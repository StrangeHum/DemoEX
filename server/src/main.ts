import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('API по-пацански')
    .setDescription('Описание API для своих')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
