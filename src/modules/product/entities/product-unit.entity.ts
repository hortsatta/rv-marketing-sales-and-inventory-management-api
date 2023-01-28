import { Column, Entity } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';

@Entity()
export class ProductUnit extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
