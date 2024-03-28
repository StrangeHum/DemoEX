import { IsEmail } from 'sequelize-typescript';

export class CreateUserDto {
  readonly firstName: string;
  readonly secondName: string;
  readonly surname: string;
  readonly login: string;
  readonly password: string;
  // @IsEmail
  readonly email: string;
  readonly phone: string;
  readonly isAdmin: boolean;
}
