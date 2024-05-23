import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import createOrderDTO from './dto/createOrder.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { authDataJWT } from 'src/auth/dto/authDataJWT.dto';
import { UploadFileDTO } from './dto/uploadFile.dto';
import { userDataFromToken, dataOnToken } from 'src/types/types';

@Controller('order')
@ApiTags('order')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiBody({ type: authDataJWT })
  async getAllOrdersByUserId(@Request() req: userDataFromToken) {
    const { user } = req;
    return this.orderService.findAllOrdersByUserId(user.id);
  }

  @Post('create')
  @ApiBody({ type: authDataJWT })
  async createOrder(
    @Body() body: createOrderDTO,
    @Request() req: userDataFromToken,
  ) {
    const { user } = req;
    return this.orderService.create(body, { id: user.id });
  }

  @Post('uploadFile')
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
  @ApiBody({ type: UploadFileDTO })
  async uploadFile(@UploadedFile() file, @Request() req: UploadFileDTO) {
    const image = await this.orderService.uploadFile(req);
    return image;
  }

  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const image = await this.orderService.getFileById(+id);
    res.sendFile(image.path, { root: './' });
  }

  @Get(':id/filesData')
  async getOrderFilesData(@Param('id') id: number): Promise<any> {
    return this.orderService.getOrderFiles(id);
  }

  @Get(':id')
  async getOrderByID(@Param('id') id: number): Promise<any> {
    return this.orderService.getOrdersByID(id);
  }

  // @Get(':id/files')
  // async getOrderFiles(@Param('id') id: string, @Res() res: Response) {
  //   const files = await this.orderService.getOrderFiles(+id);

  //   if (files.length === 0) {
  //     res.status(404).send('No files found for this order');
  //     return;
  //   }

  //   const archive = archiver('zip', {
  //     zlib: { level: 9 } // Sets the compression level.
  //   });

  //   res.attachment(`order-${id}-files.zip`);
  //   archive.pipe(res);

  //   files.forEach(file => {
  //     const filePath = file.path;
  //     if (fs.existsSync(filePath)) {
  //       archive.file(filePath, { name: file.filename });
  //     }
  //   });

  //   await archive.finalize();
  // }
}
