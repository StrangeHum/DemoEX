import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderModel } from './models/order.entity';
import { StatusOrderModel } from './models/status-order.entity';

@Module({
  imports: [SequelizeModule.forFeature([StatusOrderModel, OrderModel])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
