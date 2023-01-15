import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
