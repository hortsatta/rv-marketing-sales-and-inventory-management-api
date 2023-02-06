import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { FilterFieldsInterceptor, Serialize } from '@/interceptors';
import {
  CreateProductDto,
  CreateProductUnitDto,
  ResponseProductDto,
  ResponseProductUnitDto,
  UpdateProductDto,
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
  @Serialize(ResponseProductDto)
  @UseInterceptors(FilterFieldsInterceptor)
  findAll(@Query('q') q: string): Promise<Product[]> {
    return this.productService.findAll(q);
  }

  @Get('/:sku')
  @Serialize(ResponseProductDto)
  @UseInterceptors(FilterFieldsInterceptor)
  async findOne(@Param('sku') sku: string): Promise<Product> {
    const product = await this.productService.findOneBySku(sku);

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

  @Patch('/:id')
  @Serialize(ResponseProductDto)
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, body);
  }

  // Product unit
  @Get('/units')
  @Serialize(ResponseProductUnitDto)
  @UseInterceptors(FilterFieldsInterceptor)
  findAllProductUnits(): Promise<ProductUnit[]> {
    return this.productUnitService.findAll();
  }

  @Get('/units/:id')
  @Serialize(ResponseProductUnitDto)
  @UseInterceptors(FilterFieldsInterceptor)
  async findOneProductUnit(@Param('id') id: string): Promise<ProductUnit> {
    const productUnit = this.productUnitService.findOneById(id);

    if (!productUnit) {
      throw new NotFoundException('Unit not found');
    }

    return productUnit;
  }

  @Post('/units')
  @Serialize(ResponseProductUnitDto)
  createProductUnit(@Body() body: CreateProductUnitDto): Promise<ProductUnit> {
    return this.productUnitService.create(body);
  }
}
