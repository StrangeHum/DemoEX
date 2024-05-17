import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'images' })
export class ImageModel extends Model<ImageModel> {
  @Column
  filename: string;

  @Column
  path: string;
}
