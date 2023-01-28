import { Expose } from 'class-transformer';
import { ResponseBaseDto } from '@/common/dtos';

export class ResponseProductUnitDto extends ResponseBaseDto {
  @Expose()
  name: string;
}
