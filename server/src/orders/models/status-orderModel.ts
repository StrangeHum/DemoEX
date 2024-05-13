import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'statusorder' })
export class StatusOrderModel extends Model<StatusOrderModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column title: string;
}
