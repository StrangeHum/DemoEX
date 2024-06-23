import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.entity';
import { FindOptions, Model, where } from 'sequelize';
import { UserAuthModel } from './models/authData.entity';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserRole } from 'src/types/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(UserAuthModel)
    private userAuthModel: typeof UserAuthModel,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }
  async findOneByLogin(login: string): Promise<UserAuthModel> {
    var userData = await this.userAuthModel.findOne({
      where: { login: login },
      include: [UserModel],
    });
    return userData;
  }
  async getAllUsers(): Promise<UserModel[]> {
    var user = await this.userModel.findAll();

    return user;
  }
  async getOneByID(id: number): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async findOneByConfig(config: FindOptions): Promise<UserModel> {
    return this.userModel.findOne(config);
  }
  async remove(id: number): Promise<void> {
    const user = await this.getOneByID(id);
    await user.destroy();
  }

  async create({
    user: userData,
    authData,
  }: CreateUserDto): Promise<UserModel> {
    const userAuthData = await this.userAuthModel.create<UserAuthModel>({
      login: authData.login,
      password: authData.password,
    });

    const user = await this.userModel.create<UserModel>({
      firstName: userData.firstName,
      secondName: userData.secondName,
      surname: userData.surname,
      email: userData.email,
      phone: userData.phone,
      userAuthData: userAuthData,
      role: UserRole.User,
    });

    userAuthData.userId = user.id;

    await user.save();
    await userAuthData.save();

    return user;
  }
}
