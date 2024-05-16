import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order-model';
import { StatusOrderModel } from './models/status-orderModel';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    @InjectModel(StatusOrderModel)
    private statusOrderModel: typeof StatusOrderModel,
  ) {}
  async create(): Promise<OrderModel> {
    //{ data: any, userId: number }: any
    const order = await this.orderModel.create<OrderModel>({
      description: 'description',
      userId: 101, //FIXME Вынести в тип
      numberCar: 'numberCar',
      address: 'address',
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
