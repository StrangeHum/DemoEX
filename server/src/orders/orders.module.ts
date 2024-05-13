import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './models/order-model';
import { StatusOrderModel } from './models/status-orderModel';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel, StatusOrderModel])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
