import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { UserAuthModel } from './authData.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiHideProperty()
  id: number;

  @Column firstName: string;

  @Column secondName: string;

  @Column surname: string;

  @HasOne(() => UserAuthModel)
  userAuthData: UserAuthModel;

  @Column
  email: string;

  @Column
  phone: string;
}
