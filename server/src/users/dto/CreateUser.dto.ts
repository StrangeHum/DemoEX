import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../models/user.entity';
import { UserAuthModel } from '../models/authData.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Данные пользователя' })
  user: UserModel;

  @ApiProperty({ description: 'Данные для авторизации пользователя' })
  authData: UserAuthModel;
}
