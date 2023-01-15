import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UnitType } from '@/product/entities/product.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  sku: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  images: string[];

  @IsEnum(UnitType)
  unit: UnitType;

  @IsString()
  @MaxLength(255)
  brand: string;

  @IsPositive()
  dimensionLength: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  dimensionWidth: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  dimensionHeight: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  weight: number;

  @IsString()
  @MaxLength(16)
  ean: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
