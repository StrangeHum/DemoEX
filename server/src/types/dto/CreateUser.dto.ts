import { IsEmail } from 'sequelize-typescript';
import { UserAuthData, UserType } from '../types';

export class CreateUserDto {
  user: UserType;
  authData: UserAuthData;
}
