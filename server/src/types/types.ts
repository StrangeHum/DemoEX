export type IUser = {
  id: string;
  login: string;
};

export type UserAuthData = {
  login: string;
  password: string;
};

export type DataOnJWTToken = {
  id: number;
};

export type UserType = {
  readonly id: number;
  readonly firstName: string;
  readonly secondName: string;
  readonly surname: string;

  readonly email: string;
  readonly phone: string;
  readonly isAdmin: boolean; //TODO: Server: добавить несколько ролей
};

export type OrderType = {
  id: number;
  userId: number;
  description: string;
  numberCar: string;
  address: string;
  status: OrderStatusType;
};

export type OrderStatusType = {
  id: number;
  title: string;
};
