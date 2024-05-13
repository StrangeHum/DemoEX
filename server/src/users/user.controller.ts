import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserModel } from './user.model';
import { CreateUserDto } from 'src/types/dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<UserModel[]> {
    return this.userService.findAllData();
  }
  @Post('create')
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    //TODO: проверки на перед созданием

    console.log('Create user', body);
    const user = await this.userService.create(body);

    return user;
  }
}
