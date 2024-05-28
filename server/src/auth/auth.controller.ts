import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Redirect,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { authDataJWT } from 'src/auth/dto/authDataJWT.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { authDataPassword } from 'src/auth/dto/authDataPassword.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

import { Response as Res } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: authDataPassword })
  async loginFoo(@Request() req, @Response() res: Res) {
    const user = await this.authService.login(req.user);
    res.status(200).send(user);
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: authDataJWT })
  async authJWT(@Request() req: { token: string; user: any }) {
    const data = req.user;
    return data;
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  @ApiBody({ type: authDataJWT })
  async refreshToken(@Request() req: { token: string; user: any }) {
    const user = await this.authService.refreshToken(req.user);
    return user;
  }
}
