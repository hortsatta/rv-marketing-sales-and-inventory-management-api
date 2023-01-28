import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { FilterFieldsInterceptor, Serialize } from '@/interceptors';
import {
  CreateProductDto,
  CreateProductUnitDto,
  ResponseProductDto,
  ResponseProductUnitDto,
} from './dtos';
import { Product, ProductUnit } from './entities';
import { ProductService } from './product.service';
import { ProductUnitService } from './product-unit.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productUnitService: ProductUnitService,
  ) {}

  @Get()
  @UseInterceptors(FilterFieldsInterceptor)
  @Serialize(ResponseProductDto)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(FilterFieldsInterceptor)
  @Serialize(ResponseProductDto)
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Post()
  @Serialize(ResponseProductDto)
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Get('/units')
  @UseInterceptors(FilterFieldsInterceptor)
  @Serialize(ResponseProductUnitDto)
  findAllProductUnits(): Promise<ProductUnit[]> {
    return this.productUnitService.findAll();
  }

  @Get('/units/:id')
  @UseInterceptors(FilterFieldsInterceptor)
  @Serialize(ResponseProductUnitDto)
  async findOneProductUnit(@Param('id') id: string): Promise<ProductUnit> {
    return this.productUnitService.findOne(id);
  }

  @Post('/units')
  @Serialize(ResponseProductUnitDto)
  createProductUnit(@Body() body: CreateProductUnitDto): Promise<ProductUnit> {
    return this.productUnitService.create(body);
  }
}
