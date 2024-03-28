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
import { User } from './user.model';
import { CreateUserDto } from './CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user?')
  getUser(@Query('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('create')
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    console.log('Create user', dto);
    return this.userService.create(dto);
  }
}
