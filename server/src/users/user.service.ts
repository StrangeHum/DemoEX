import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './CreateUser.dto';
import { FindOptions } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async findOneByConfig(config: FindOptions): Promise<User> {
    return this.userModel.findOne(config);
  }
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create<User>({
      firstName: dto.firstName,
      secondName: dto.secondName,
      surname: dto.surname,
      login: dto.login,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
    });
    return user;
  }
}
