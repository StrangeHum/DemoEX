import { ApiProperty } from '@nestjs/swagger';

export class authDataPassword {
  @ApiProperty() login: string;
  @ApiProperty() password: string;
}
