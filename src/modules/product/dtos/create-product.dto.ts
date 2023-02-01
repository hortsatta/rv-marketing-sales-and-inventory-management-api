import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  sku: string;

  @IsUUID()
  unit: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString({ each: true })
  @IsOptional()
  images: string[];

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
