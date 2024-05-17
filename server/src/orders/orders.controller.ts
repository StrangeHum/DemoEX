import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import createOrderDTO from './dto/createOrder.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('create')
  async createOrder(@Body() body: createOrderDTO) {
    return this.orderService.create(body);
  }
  @Get('findAll')
  async findAllOrdersByUserId(@Body() body: { userId: number }) {
    return this.orderService.findAllOrdersByUserId(body.userId);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async file(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { filename: file.originalname };
  }
  @Post('files')
  @UseInterceptors(FilesInterceptor('images', 10))
  uploadFiles(@UploadedFiles() files) {
    console.log(files);
    // здесь можешь обрабатывать загруженные файлы (например, сохранять их пути в базу данных)
    return files.map((file) => ({ filename: file.filename }));
  }
}
