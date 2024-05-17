import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Table({ tableName: 'userAuth' })
export class UserAuthModel extends Model<UserAuthModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiHideProperty()
  id: number;

  // user: UserModel;
  // @ForeignKey(() => UserModel)
  // user: UserModel;
  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @BelongsTo(() => UserModel) user: UserModel;

  @Column
  login: string;

  @Column
  password: string;
}
