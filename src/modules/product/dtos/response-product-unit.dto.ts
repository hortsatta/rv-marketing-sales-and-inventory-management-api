import { Expose } from 'class-transformer';
import { ResponseBaseDto } from '@/common/dtos/response-base.dto';

export class ResponseProductUnitDto extends ResponseBaseDto {
  @Expose()
  name: string;
}
