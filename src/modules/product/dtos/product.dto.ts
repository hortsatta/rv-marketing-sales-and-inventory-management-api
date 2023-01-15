import { Expose } from 'class-transformer';
import { UnitType } from '../entities';

export class ProductDto {
  @Expose()
  productId: string;

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
  dimensionLength: number;

  @Expose()
  dimensionWidth: number;

  @Expose()
  dimensionHeight: number;

  @Expose()
  weight: number;

  @Expose()
  ean: string;

  @Expose()
  createAt: boolean;

  @Expose()
  modifiedAt: boolean;
}
