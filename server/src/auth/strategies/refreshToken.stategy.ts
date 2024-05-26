import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { dataOnToken } from 'src/types/types';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      // usernameField: 'login',
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

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
