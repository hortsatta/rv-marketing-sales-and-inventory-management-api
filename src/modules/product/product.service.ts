import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dtos';
import { Product } from './entities';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<Product> {
    return this.repo.findOneBy({ id });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const product = this.repo.create(productDto);
    return this.repo.save(product);
  }
}
