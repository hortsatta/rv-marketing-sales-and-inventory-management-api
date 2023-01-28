import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductUnitDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
