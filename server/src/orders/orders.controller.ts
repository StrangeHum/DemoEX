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
import { userDataFromToken } from 'src/types/types';
import { OrderModel } from './models/order.entity';

@Controller('orders')
@ApiTags('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiBody({ type: authDataJWT })
  async getAllOrdersByUserId(
    @Request() req: userDataFromToken,
  ): Promise<{ orders: OrderModel[] }> {
    const { user } = req;
    const orders = await this.orderService.findAllOrdersByUserId(user.id);
    return { orders: orders };
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
      limits: { fileSize: 50 * 1024 * 1024 }, //лимит размера файла до 50MB
    }),
  )
  @ApiBody({ type: UploadFileDTO })
  async uploadFile(
    @Body() body,
    @UploadedFile() file,
    @Request() req: UploadFileDTO,
  ) {
    console.log(file);
    // const data: UploadFileDTO = {
    //   file: file,
    //   orderId: 7,
    //   user: req.user,
    // };
    // console.log(data);

    // const image = await this.orderService.uploadFile(data);
    // console.log(image);

    return 'image';
  }

  @Get('file/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const image = await this.orderService.getFileById(+id);
      if (!image) {
        return res.status(404).send('File not found');
      }
      res.sendFile(image.path, { root: './' });
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  }

  @Get(':id/filesData')
  async getOrderFilesData(@Param('id') id: number): Promise<any> {
    return this.orderService.getOrderFiles(id);
  }

  @Get(':id')
  async getOrderByID(@Param('id') id: number): Promise<any> {
    return this.orderService.getOrderByID(id);
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
