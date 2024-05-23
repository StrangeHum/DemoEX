import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../models/user.entity';
import { UserAuthModel } from '../models/authData.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Данные пользователя' })
  @IsNotEmpty()
  user: UserModel;

  @ApiProperty({ description: 'Данные для авторизации пользователя' })
  @IsNotEmpty()
  authData: UserAuthModel;
}
