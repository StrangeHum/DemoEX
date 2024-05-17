import { ApiProperty } from '@nestjs/swagger';

export class authDataJWT {
  @ApiProperty()
  token: string;
}
