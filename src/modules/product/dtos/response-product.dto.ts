import { Expose, Transform } from 'class-transformer';
import { ResponseBaseDto } from '@/common/dtos/response-base.dto';
import { ResponseProductUnitDto } from './response-product-unit.dto';

export class ResponseProductDto extends ResponseBaseDto {
  @Expose()
  name: string;

  @Expose()
  sku: string;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  @Expose()
  @Transform(({ obj: { unit } }) =>
    unit ? { id: unit.id, name: unit.name } : null,
  )
  unit: ResponseProductUnitDto;

  @Expose()
  brand: string;

  @Expose()
  dimensionLength: number;

  @Expose()
  dimensionWidth: number;

  @Expose()
  dimensionHeight: number;

  @Expose()
  weight: number;

  @Expose()
  ean: string;
}
