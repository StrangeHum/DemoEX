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
import { UserModel } from './models/user.entity';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
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

    const user = await this.userService.create(body);

    return user;
  }
}
