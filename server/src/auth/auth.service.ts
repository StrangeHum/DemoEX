import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { UsersService as UserService } from 'src/users/user.service';
import { UserDataDto } from './dto/user-data.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string): Promise<UserDataDto> {
    const user = await this.userService.findOneByConfig({
      where: {
        login,
        // password,
      },
    });

    if (user && user.password === password) {
      const result: UserDataDto = user;
      return result;
    }

    return null;
  }

  async login(user: IUser) {
    const { id, login } = user;
    return {
      id,
      login,
      token: this.jwtService.sign({ login: user.login, id: user.id }),
    };
  }
}
