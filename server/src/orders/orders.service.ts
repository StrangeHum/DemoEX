import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order.entity';
import { StatusOrderModel } from './models/status-order.entity';
import createOrderDTO from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(StatusOrderModel)
    private statusOrderModel: typeof StatusOrderModel,
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

    return order;
  }
}
