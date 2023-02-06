import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { ProductUnitService } from './product-unit.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private readonly productUnitService: ProductUnitService,
  ) {}

  async findAll(q?: string): Promise<Product[]> {
    let products = [];
    if (q) {
      const formattedQuery = q.trim().replace(/ /g, ' | ');
      products = await this.repo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.unit', 'productUnit')
        .where({ isActive: true })
        .andWhere(
          new Brackets((qb) => {
            qb.where('to_tsvector(product.name) @@ to_tsquery(:query)', {
              query: `${formattedQuery}:*`,
            })
              .orWhere('to_tsvector(product.sku) @@ to_tsquery(:query)', {
                query: `${formattedQuery}:*`,
              })
              .orWhere('to_tsvector(product.brand) @@ to_tsquery(:query)', {
                query: `${formattedQuery}:*`,
              })
              .orWhere('to_tsvector(product.ean) @@ to_tsquery(:query)', {
                query: `${formattedQuery}:*`,
              });
          }),
        )
        .getMany();
    } else {
      products = await this.repo.find({ where: { isActive: true } });
    }

    // Return images as an array with single image for thumbnail
    return products.map((p) => {
      if (p.images.length > 1) {
        return {
          ...p,
          images: [p.images[0]],
        };
      }
      return p;
    });
  }

  findOneById(id: string): Promise<Product> {
    return this.repo.findOne({ where: { id, isActive: true } });
  }

  findOneBySku(sku: string): Promise<Product> {
    return this.repo.findOne({ where: { sku, isActive: true } });
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
