import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageModel } from './image.model';

@Module({
  imports: [SequelizeModule.forFeature([ImageModel])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
