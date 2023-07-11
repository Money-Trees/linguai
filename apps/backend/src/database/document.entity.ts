import { Document } from '@naite/types';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DocumentEntity extends BaseEntity implements Document {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @CreateDateColumn()
  public readonly created_at!: Date;

  @UpdateDateColumn()
  public readonly updated_at!: Date;
}
