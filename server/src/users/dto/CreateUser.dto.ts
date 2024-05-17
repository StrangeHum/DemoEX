import { IsEmail } from 'sequelize-typescript';
import { UserAuthData, UserType } from '../../types/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Данные пользователя' })
  user: UserType;

  @ApiProperty({ description: 'Данные для авторизации пользователя' })
  authData: UserAuthData;
}
