import { Expose, Transform } from 'class-transformer';
import { Product, UnitType } from '../entities';

export class ResponseProductDto {
  @Transform(({ obj }: { obj: Product }) => obj.productId)
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  sku: string;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  @Expose()
  unit: UnitType;

  @Expose()
  brand: string;

  @Expose()
  @Transform(({ obj }: { obj: Product }) => +obj.dimensionLength)
  dimensionLength: number;

  @Expose()
  @Transform(({ obj }: { obj: Product }) => +obj.dimensionWidth)
  dimensionWidth: number;

  @Expose()
  @Transform(({ obj }: { obj: Product }) => +obj.dimensionHeight)
  dimensionHeight: number;

  @Expose()
  @Transform(({ obj }: { obj: Product }) => +obj.weight)
  weight: number;

  @Expose()
  ean: string;

  @Expose()
  createdAt: string;

  @Expose()
  modifiedAt: string;
}
