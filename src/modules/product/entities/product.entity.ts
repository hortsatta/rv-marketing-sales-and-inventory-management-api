import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ColumnNumericTransformer } from '@/common/transformers/column-numeric.transformer';

import { Base as BaseEntity } from '@/common/entities/base.entity';
import { ProductUnit } from './product-unit.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  sku: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @OneToOne(() => ProductUnit, { eager: true })
  @JoinColumn()
  unit: ProductUnit;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  dimensionLength: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  dimensionWidth: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  dimensionHeight: number;

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  weight: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  ean: string;
}
