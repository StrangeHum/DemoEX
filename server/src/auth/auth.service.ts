import { Injectable } from '@nestjs/common';

import { UsersService as UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import responseDataAuth from './dto/responseDataAuth.dto';
import { UserModel } from 'src/users/models/user.entity';

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
      token: this.jwtService.sign({ id }),
    };
  }
}
