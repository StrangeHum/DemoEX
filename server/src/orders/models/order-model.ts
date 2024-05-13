import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { StatusOrderModel } from './status-orderModel';

@Table({ tableName: 'order' })
export class OrderModel extends Model<OrderModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => StatusOrderModel)
  @Column
  statusId!: number;

  @BelongsTo(() => StatusOrderModel)
  status: StatusOrderModel;
}
