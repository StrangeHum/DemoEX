import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { UserAuthModel } from './authData.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

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
}
