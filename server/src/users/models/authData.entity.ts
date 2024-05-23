import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { UserModel } from './user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/types/types';

@Table({ tableName: 'userAuth' })
export class UserAuthModel extends Model<UserAuthModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiHideProperty()
  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @Column
  login: string;

  @Column
  password: string;

  @Column({
    type: DataType.ENUM,
    values: Object.keys(UserRole),
    allowNull: false,
  })
  role: UserRole;
}
