import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderModel } from './order-model';

@Table({ tableName: 'statusorder' })
export class StatusOrderModel extends Model<StatusOrderModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column title: string;
}
