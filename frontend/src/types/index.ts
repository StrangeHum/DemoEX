export type User = {
  id: number;
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  phone: string;
};

export type AuthData = {
  idUser: number;
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
