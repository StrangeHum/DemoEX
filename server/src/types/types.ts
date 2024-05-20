import { ApiProperty } from '@nestjs/swagger';

export class dataOnToken {
  @ApiProperty() id: string;
  @ApiProperty() role: UserRole;
}

export enum UserRole {
  User = 'User',
  Police = 'Police',
  Moderator = 'Moderator',
  Admin = 'Admin',
}
