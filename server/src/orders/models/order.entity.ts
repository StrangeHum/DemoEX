import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { StatusOrderModel } from './status-order.entity';
import { UserModel } from 'src/users/models/user.entity';
import { FileModel } from './file.entity';

@Table({ tableName: 'order' })
export class OrderModel extends Model<OrderModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => StatusOrderModel)
  @Column
  statusId!: number;

  @BelongsTo(() => StatusOrderModel)
  status: StatusOrderModel;

  @Column description: string;

  @Column numberCar: string;

  @Column address: string;

  @HasMany(() => FileModel)
  files: FileModel[];
}
