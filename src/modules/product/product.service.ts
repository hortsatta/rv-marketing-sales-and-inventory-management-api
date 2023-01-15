import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.repo.find({});
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    console.log('productDto', productDto);
    return {} as Product;
  }
}
