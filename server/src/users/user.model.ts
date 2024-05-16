import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { UserAuthModel } from './userAuthData.model';

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
