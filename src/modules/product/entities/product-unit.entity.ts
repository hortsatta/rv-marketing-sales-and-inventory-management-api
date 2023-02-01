import { Column, Entity, OneToMany } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities/base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductUnit extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Product, (product) => product.unit)
  products: Product[];
}
