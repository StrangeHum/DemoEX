import { UserRole } from 'src/types/types';
import { UserModel } from 'src/users/models/user.entity';

export default class responseDataAuth {
  user: UserModel;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
