import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { FilterFieldsInterceptor, Serialize } from '@/interceptors';
import { CreateProductDto, ResponseProductDto } from './dtos';
import { Product } from './entities';
import { ProductService } from './product.service';

@Controller('products')
@Serialize(ResponseProductDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseInterceptors(FilterFieldsInterceptor)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(FilterFieldsInterceptor)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
