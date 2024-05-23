import { ApiProperty } from '@nestjs/swagger';

export class dataOnToken {
  @ApiProperty()
  id: number;
  @ApiProperty() role: UserRole;
}

export class userDataFromToken {
  @ApiProperty()
  user: dataOnToken;
}

export enum UserRole {
  User = 'User',
  Police = 'Police',
  Moderator = 'Moderator',
  Admin = 'Admin',
}
