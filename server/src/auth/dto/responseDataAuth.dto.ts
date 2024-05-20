import { UserModel } from 'src/users/models/user.entity';

export default class responseDataAuth {
  token: string;
  user: UserModel;
}
