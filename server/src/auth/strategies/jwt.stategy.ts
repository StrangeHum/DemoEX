import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { dataOnToken } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // usernameField: 'login',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //Оно работет, но не понимаю почему
  /**
   * Эта фукнция срабатывает, после дешифровки JWT токена, и встравивает в запрос, возвращаемые данные
   * @param user - данные из токена
   * @returns встраиваемые данные
   */
  async validate(user: dataOnToken) {
    console.log('validate', user);
    return { ...user };
  }
}
