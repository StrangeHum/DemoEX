import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/users/user.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
