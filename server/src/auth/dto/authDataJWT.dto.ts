import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class authDataJWT {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
