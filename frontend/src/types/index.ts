export type User = {
  id: number;
  firstName: string;
  secondName: string;
  surname: string;
  email: string;
  phone: string;
};

export type authDataPassword = {
  login: string;
  password: string;
};

export type Order = {
  id: number;
  numberCar: string;
  status: number;
  date: string;
};
export type Status = {
  id: number;
  title: string;
};

export enum UserRole {
  User = "User",
  Police = "Police",
  Moderator = "Moderator",
  Admin = "Admin",
}
