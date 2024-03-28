import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('login')
  async login(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    if (!body.login || !body.password) {
      res.status(HttpStatus.UNAUTHORIZED);
      return null;
    }

    const user = await this.authService.validateUser(body.login, body.password);

    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED);
      return null;
    }

    res.set({ Token: 'user.login' });
    return user;
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginFoo(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  async authJWT(@Request() req) {
    return req.user;
  }
}
