import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OrderModel } from './order.entity';

@Table({ tableName: 'file' })
export class FileModel extends Model<FileModel> {
  @Column
  filename: string;

  @Column
  path: string;

  @ForeignKey(() => OrderModel)
  @Column
  orderId: number;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
//TODO: Различие типов файлов
