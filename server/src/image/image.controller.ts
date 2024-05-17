import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@Controller('images')
@ApiTags('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const image = await this.imageService.uploadImage(file);
    return image;
  }

  //   @Post('uploadfiles')
  //   @UseInterceptors(
  //     FilesInterceptor('file', 10, {
  //       storage: diskStorage({
  //         destination: './uploads',
  //         filename: (req, file, cb) => {
  //           const randomName = Array(32)
  //             .fill(null)
  //             .map(() => Math.round(Math.random() * 16).toString(16))
  //             .join('');
  //           cb(null, `${randomName}${extname(file.originalname)}`);
  //         },
  //       }),
  //     }),
  //   )
  //   async uploadFiles(@UploadedFiles() file) {
  //     const image = await this.imageService.uploadImage(file);
  //     return image;
  //   }

  @Get()
  async getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const image = await this.imageService.getImageById(+id);
    res.sendFile(image.path, { root: './' });
  }
}
