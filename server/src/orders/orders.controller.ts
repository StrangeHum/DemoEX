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
      // limits: { fileSize: 50 * 1024 * 1024 }, //лимит размера файла до 50MB
    }),
  )
  @ApiBody({ type: UploadFileDTO })
  async uploadFile(
    @Body() body,
    @UploadedFile() file,
    @Request() req: UploadFileDTO,
  ) {
    const data: UploadFileDTO = {
      file: file,
      orderId: 14,
      user: req.user,
    };

    const image = await this.orderService.uploadFile(data);

    return data;
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
}
