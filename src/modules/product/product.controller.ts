import { Body, Controller, Get, Post } from '@nestjs/common';

import { Serialize } from '@/interceptors';
import { CreateProductDto, ResponseProductDto } from './dtos';
import { Product } from './entities';
import { ProductService } from './product.service';

@Controller('products')
@Serialize(ResponseProductDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
