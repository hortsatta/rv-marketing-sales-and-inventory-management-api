import {
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  pid: number;

  @Column({ unique: true })
  @Generated('uuid')
  id: string;

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
