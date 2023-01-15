import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  productId: string;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  description: string;

  @Column()
  images: string[];

  @Column()
  unit: string;

  @Column()
  brand: string;

  @Column()
  dimensionLength: number;

  @Column()
  dimensionWidth: number;

  @Column()
  dimensionHeight: number;

  @Column()
  weight: number;

  @Column()
  ean: string;
}
