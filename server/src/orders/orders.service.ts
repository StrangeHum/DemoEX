import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order.entity';
import { StatusOrderModel } from './models/status-order.entity';
import createOrderDTO from './dto/createOrder.dto';
import { FileModel } from './models/file.entity';
import { UserModel } from 'src/users/models/user.entity';
import { UploadFileDTO } from './dto/uploadFile.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(StatusOrderModel)
    private statusOrderModel: typeof StatusOrderModel,
    @InjectModel(FileModel)
    private readonly imageModel: typeof FileModel,
  ) {}
  async create(data: createOrderDTO, user: { id }): Promise<OrderModel> {
    //TODO: Загрузка Изображений

    const order = await this.orderModel.create<OrderModel>({
      description: data.description,
      userId: user.id,
      numberCar: data.numberCar,
      address: data.address,
      statusId: 1,
    });

    await order.save();

    return order;
  }

  async findAllOrdersByUserId(userId: number): Promise<OrderModel[]> {
    //{ data: any, userId: number }: any
    const order = await this.orderModel.findAll<OrderModel>({
      include: [StatusOrderModel],
      where: [
        {
          userId: userId,
        },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
  async getOrdersByID(id: number): Promise<OrderModel> {
    //{ data: any, userId: number }: any
    const order = await this.orderModel.findByPk<OrderModel>(id);

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
  //------IMAGE-------//

  async uploadFile(data: UploadFileDTO): Promise<FileModel> {
    const { file, orderId, user } = data;

    //TODO: Можно удалить
    const order = await this.getOrdersByID(orderId);

    //FIXME Удалить сохранённый файл, в случае ошибки

    //FIXME
    if (order.userId != user.id) {
      throw new Error('Access denied');
    }

    const createdFile = await this.imageModel.create({
      filename: file.originalname,
      path: file.path,
      orderId: orderId,
    });

    return createdFile;
  }

  async getAllFiles(): Promise<FileModel[]> {
    return this.imageModel.findAll();
  }

  async getFileById(id: number): Promise<FileModel> {
    return this.imageModel.findOne({ where: { id } });
  }

  async getOrderFiles(orderId: number): Promise<FileModel[]> {
    const order = await this.orderModel.findByPk(orderId, {
      include: [FileModel],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order.files;
  }
}
