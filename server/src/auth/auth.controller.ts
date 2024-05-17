import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { authDataJWT } from 'src/auth/dto/authDataJWT.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { authDataPassword } from 'src/auth/dto/authDataPassword.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: authDataPassword })
  async loginFoo(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: authDataJWT })
  async authJWT(@Request() req: { token: string; user: any }) {
    return req.user;
  }
}
