import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order.entity';
import { StatusOrderModel } from './models/status-order.entity';
import createOrderDTO from './dto/createOrder.dto';
import { FileModel } from './models/file.entity';

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
  async create(data: createOrderDTO): Promise<OrderModel> {
    const { order: orderData, user } = data;

    //TODO: Загрузка Изображений

    const order = await this.orderModel.create<OrderModel>({
      description: orderData.description,
      userId: user.userId,
      numberCar: orderData.numberCar,
      address: orderData.address,
      statusId: 1,
    });

    await order.save();

    return order;
  }

  async findAllOrdersByUserId(userId: number): Promise<OrderModel[]> {
    //{ data: any, userId: number }: any
    const order = await this.orderModel.findAll<OrderModel>({
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

  async uploadFile(file: Express.Multer.File): Promise<FileModel> {
    return this.imageModel.create({
      filename: file.originalname,
      path: file.path,
    });
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
