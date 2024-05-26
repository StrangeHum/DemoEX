import { Injectable } from '@nestjs/common';

import { UsersService as UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import responseDataAuth from './dto/responseDataAuth.dto';
import { UserModel } from 'src/users/models/user.entity';
import responseRefreshedAccessToken from './dto/responseRefreshedAccessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string): Promise<UserModel> {
    const userAuthData = await this.userService.findOneByLogin(login);

    if (userAuthData && userAuthData.password === password) {
      const result: UserModel = userAuthData.user;
      return userAuthData.user;
    }

    return null;
  }

  async login(user: UserModel): Promise<responseDataAuth> {
    const { id } = user;

    return {
      user: user,
      accessToken: this.jwtService.sign({ id }),
      refreshToken: this.jwtService.sign({ id }, { expiresIn: '7d' }),
    };
  }
  //TODO: Изменить обновление токена
  async refreshToken(user: UserModel): Promise<responseRefreshedAccessToken> {
    const { id } = user;

    //TODO: Создать тип Payload - содержащий данные для токена
    // const payload = {
    //   username:
    // }

    return {
      accessToken: this.jwtService.sign({ id }),
    };
  }
}
