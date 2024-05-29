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
