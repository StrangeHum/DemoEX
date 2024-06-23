import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserModel } from './models/user.entity';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/types/types';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto): Promise<UserModel> {
    //FIXME: проверки на существование пользователя перед созданием

    const user = await this.userService.create(body);

    return user;
  }

  @Post('setrole')
  async setUserRole(
    @Body() body: { userId: number; role: UserRole },
  ): Promise<UserModel> {
    const user = await this.userService.getOneByID(body.userId);

    user.role = body.role;

    await user.save();

    return user;
  }

  // @Post('edit')
  // async setUserData(
  //   @Body() body: { userId: number; role: UserRole },
  // ): Promise<UserModel> {
  //   const user = await this.userService.getOneByID(body.userId);

  //   user.role = body.role;

  //   await user.save();

  //   return user;
  // }
}
