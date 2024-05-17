import { ApiProperty } from '@nestjs/swagger';

export type IUser = {
  id: string;
  login: string;
};

export class UserAuthData {
  @ApiProperty() login: string;
  @ApiProperty() password: string;
}

export type DataOnJWTToken = {
  id: number;
};

export class UserType {
  @ApiProperty() readonly id: number;

  @ApiProperty() readonly firstName: string;
  @ApiProperty() readonly secondName: string;
  @ApiProperty() readonly surname: string;

  @ApiProperty() readonly email: string;
  @ApiProperty() readonly phone: string;
  @ApiProperty() readonly isAdmin: boolean; //TODO: Server: добавить несколько ролей
}

export class OrderType {
  id: number;
  userId: number;
  description: string;
  numberCar: string;
  address: string;
  status: OrderStatusType;
}

export type OrderStatusType = {
  id: number;
  title: string;
};
