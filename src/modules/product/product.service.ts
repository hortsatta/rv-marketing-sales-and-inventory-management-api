import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dtos';
import { Product } from './entities';
import { ProductUnitService } from './product-unit.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private readonly productUnitService: ProductUnitService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  findOne(id: string): Promise<Product> {
    return this.repo.findOneBy({ id });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const unit = await this.productUnitService.findOne(productDto.unit);

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    const product = this.repo.create({ ...productDto, unit });
    return this.repo.save(product);
  }
}
