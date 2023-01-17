import { Expose, Transform } from 'class-transformer';
import { Product, UnitType } from '../entities';

export class ResponseProductDto {
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
  createdAt: string;

  @Expose()
  modifiedAt: string;
}
