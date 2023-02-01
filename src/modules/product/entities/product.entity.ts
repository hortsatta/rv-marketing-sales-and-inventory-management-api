import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ColumnNumericTransformer } from '@/common/transformers/column-numeric.transformer';

import { Base as BaseEntity } from '@/common/entities/base.entity';
import { ProductUnit } from './product-unit.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  sku: string;

  @ManyToOne(() => ProductUnit, (productUnit) => productUnit.products, {
    eager: true,
  })
  @JoinColumn()
  unit: ProductUnit;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  images: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand: string;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  dimensionLength: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  dimensionWidth: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  dimensionHeight: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  weight: number;

  @Column({ type: 'varchar', length: 16, unique: true, nullable: true })
  ean: string;
}
