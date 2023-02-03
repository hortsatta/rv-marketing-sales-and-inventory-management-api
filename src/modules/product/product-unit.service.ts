import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductUnitDto } from './dtos';
import { ProductUnit } from './entities';

@Injectable()
export class ProductUnitService {
  constructor(
    @InjectRepository(ProductUnit) private repo: Repository<ProductUnit>,
  ) {}

  findAll(): Promise<ProductUnit[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  findOneById(id: string): Promise<ProductUnit> {
    return this.repo.findOneBy({ id });
  }

  create(unitDto: CreateProductUnitDto): Promise<ProductUnit> {
    const productUnit = this.repo.create(unitDto);
    return this.repo.save(productUnit);
  }
}
