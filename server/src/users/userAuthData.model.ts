import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'userAuth' })
export class UserAuthModel extends Model<UserAuthModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // user: UserModel;
  // @ForeignKey(() => UserModel)
  // user: UserModel;
  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  //FIXME: сделсь возможна ошибка, связь 1 к многим
  @BelongsTo(() => UserModel) user: UserModel;

  @Column
  login: string;

  @Column
  password: string;
}
