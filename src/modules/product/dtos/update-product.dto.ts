import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @IsOptional()
  sku: string;

  @IsUUID()
  @IsOptional()
  unit: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsInt()
  @Min(0)
  @IsOptional()
  primaryImageIndex: number = 0;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  brand: string;

  @IsPositive()
  @IsOptional()
  dimensionLength: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  dimensionWidth: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  dimensionHeight: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  weight: number;

  @IsString()
  @MaxLength(16)
  @IsOptional()
  ean: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
