import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dtos';
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

  findOneById(id: string): Promise<Product> {
    return this.repo.findOneBy({ id });
  }

  findOneBySku(sku: string): Promise<Product> {
    return this.repo.findOneBy({ sku });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const unit = await this.productUnitService.findOneById(productDto.unit);

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    const product = this.repo.create({ ...productDto, unit });
    return this.repo.save(product);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOneById(id);
    const unit = await this.productUnitService.findOneById(productDto.unit);

    if (!product) {
      throw new NotFoundException('Product not found');
    } else if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    const { images, primaryImageIndex, ...moreProductDto } = productDto;

    const orderedImages =
      primaryImageIndex !== 0 && images.length
        ? [
            images[Number(primaryImageIndex)],
            ...images.filter((_, index) => index !== primaryImageIndex),
          ]
        : images;

    return this.repo.save({
      ...product,
      ...moreProductDto,
      images: orderedImages,
      unit,
    });
  }
}
