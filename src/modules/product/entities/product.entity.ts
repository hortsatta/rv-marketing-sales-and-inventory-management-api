import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '@/common/transformers';

export enum UnitType {
  UNITS = 'units',
  PIECES = 'pieces',
  PAIRS = 'pairs',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  pId: number;

  @Column({ unique: true })
  @Generated('uuid')
  id: string;

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
