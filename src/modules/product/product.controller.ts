import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

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

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @Query(
      'exclude',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    exclude: string[],
    @Query(
      'include',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    include: string[],
  ): Promise<Product> {
    return this.productService.findOne(id, exclude, include);
  }

  @Post()
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
