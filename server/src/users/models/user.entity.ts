import { Column, Model, Table, HasOne, DataType } from 'sequelize-typescript';
import { UserAuthModel } from './authData.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { UserRole } from 'src/types/types';

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
  @ApiHideProperty() //TODO: Если что-то не так, удалить это)
  userAuthData: UserAuthModel;

  @Column
  @IsEmail()
  email: string;

  @Column
  @IsPhoneNumber()
  phone: string;

  @Column({
    type: DataType.ENUM,
    values: Object.keys(UserRole),
    allowNull: false,
  })
  role: UserRole;
}
