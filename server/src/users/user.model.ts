import { Column, Model, Table, IsEmail } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  firstName: string;

  @Column
  secondName: string;

  @Column
  surname: string;

  @Column
  login: string;

  @Column
  // @IsEmail
  email: string;

  @Column
  password: string;

  @Column
  phone: string;

  @Column({ defaultValue: true })
  isAdmin: boolean;
}
