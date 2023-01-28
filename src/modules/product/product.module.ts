import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, ProductUnit } from './entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductUnitService } from './product-unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductUnit])],
  controllers: [ProductController],
  providers: [ProductService, ProductUnitService],
})
export class ProductModule {}
