import {
  Column,
  Model,
  Table,
  IsEmail,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { UserAuthModel } from './userAuthData.model';
import { HasOneSetAssociationMixin } from 'sequelize';

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column firstName: string;

  @Column secondName: string;

  @Column surname: string;

  @HasOne(() => UserAuthModel)
  userAuthData: UserAuthModel;

  // setUserAuthData: HasOneSetAssociationMixin<
  //   UserAuthModel,
  //   UserAuthModel['user']
  // >;

  @Column
  email: string;

  @Column
  phone: string;

  @Column({ defaultValue: true })
  isAdmin: boolean;
}
