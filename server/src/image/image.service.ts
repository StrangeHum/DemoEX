import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImageModel } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(ImageModel)
    private readonly imageModel: typeof ImageModel,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<ImageModel> {
    return this.imageModel.create({
      filename: file.originalname,
      path: file.path,
    });
  }

  async getAllImages(): Promise<ImageModel[]> {
    return this.imageModel.findAll();
  }

  async getImageById(id: number): Promise<ImageModel> {
    return this.imageModel.findOne({ where: { id } });
  }
}
