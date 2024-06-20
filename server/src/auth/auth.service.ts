import { Injectable } from '@nestjs/common';

import { UsersService as UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import responseDataAuth from './dto/responseDataAuth.dto';
import { UserModel } from 'src/users/models/user.entity';
import responseRefreshedAccessToken from './dto/responseRefreshedAccessToken.dto';
import { dataOnToken } from 'src/types/types';

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
      role: user.role,
      accessToken: this.jwtService.sign({ id }),
      refreshToken: this.jwtService.sign({ id }, { expiresIn: '7d' }),
    };
  }
  //TODO: Обьявить переменную для хранения данных в токене
  async refreshToken(user: UserModel): Promise<responseRefreshedAccessToken> {
    const payload: dataOnToken = {
      id: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
