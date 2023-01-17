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

  async findOne(
    id: string,
    exclude?: string[],
    include?: string[],
  ): Promise<Product> {
    if (exclude?.length) {
      const product = await this.repo.findOneBy({ id });
      const filteredProduct = Object.keys(product)
        .filter((key) => !exclude.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: product[key],
          };
        }, {});

      return filteredProduct as Product;
    }

    if (include?.length) {
      return this.repo.findOne({
        select: include.reduce((a, v) => ({ ...a, [v]: true }), {}),
        where: { id },
      });
    }

    return this.repo.findOneBy({ id });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const product = this.repo.create(productDto);
    return this.repo.save(product);
  }
}
