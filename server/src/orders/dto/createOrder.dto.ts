import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { dataOnToken } from 'src/types/types';

export default class createOrderDTO {
  @IsNotEmpty()
  description: string;

  numberCar: string;
  address: string;
  @ApiHideProperty()
  user: dataOnToken;
}
