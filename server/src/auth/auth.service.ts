import { Injectable } from '@nestjs/common';

import { UsersService as UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/types/types';
import responseDataAuth from 'src/types/dto/responseDataAuth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string): Promise<UserType> {
    const userAuthData = await this.userService.findOneByLogin(login);

    if (userAuthData && userAuthData.password === password) {
      const result: UserType = userAuthData.user;
      return result;
    }

    return null;
  }

  async login(user: UserType): Promise<responseDataAuth> {
    const { id } = user;

    return {
      user: user,
      token: this.jwtService.sign({ id }),
    };
  }
}
