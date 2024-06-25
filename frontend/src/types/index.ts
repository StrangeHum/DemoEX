import { DataFileOrder } from ".";

export type User = {
  id: number;
  firstName: string;
  secondName: string;
  surname: string;
  email: string;
  phone: string;
  role: UserRole;
};

export type authDataPassword = {
  login: string;
  password: string;
};

export enum UserRole {
  User = "User",
  Police = "Police",
  Moderator = "Moderator",
  Admin = "Admin",
}
export type OrderType = {
  id: number;
  userId: number;
  statusId: number;
  status: OrderStatus;
  description: string;
  numberCar: string;
  address: string;
  files: DataFileOrder[];
};
export type OrderStatus = {
  id: number;
  title: string;
};
export type DataFileOrder = {
  id: number;
  filename: string;
  path: string;
  orderId: number;
  order: string;
};
