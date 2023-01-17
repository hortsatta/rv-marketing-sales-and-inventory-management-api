import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UnitType {
  UNITS = 'units',
  PIECES = 'pieces',
  PAIRS = 'pairs',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  sku: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'enum', enum: UnitType })
  unit: UnitType;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'decimal' })
  dimensionLength: number;

  @Column({ type: 'decimal' })
  dimensionWidth: number;

  @Column({ type: 'decimal' })
  dimensionHeight: number;

  @Column({ type: 'decimal' })
  weight: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  ean: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  modifiedAt: Date;

  // @Column({ type: 'bool', default: true })
  // createBy: boolean;
}
