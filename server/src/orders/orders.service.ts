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
  async getOrderByID(id: number): Promise<OrderModel> {
    //{ data: any, userId: number }: any
    const order = await this.orderModel.findByPk<OrderModel>(id, {
      include: [StatusOrderModel, FileModel],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
  //------IMAGE-------//

  async uploadFile(data: UploadFileDTO): Promise<FileModel> {
    const { file, orderId, user } = data;

    const order = await this.getOrderByID(orderId);

    //FIXME Удалить сохранённый файл, в случае ошибки
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
  async getOrdersByStatus(): Promise<OrderModel[]> {
    const order = await this.orderModel.findAll({
      include: [FileModel, StatusOrderModel],
      where: [
        {
          statusId: 1,
        },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
  async getStatusListOrders(): Promise<StatusOrderModel[]> {
    return this.statusOrderModel.findAll();
  }
}
