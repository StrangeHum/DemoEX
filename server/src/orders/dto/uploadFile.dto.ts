import { ApiHideProperty } from '@nestjs/swagger';
import { dataOnToken } from 'src/types/types';

export class UploadFileDTO {
  file: Express.Multer.File;
  orderId: number;
  @ApiHideProperty()
  user: dataOnToken;
}
