import { Role, User } from '@naite/types';
import { Column, Entity } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';

@Entity('user')
export class UserEntity extends DocumentEntity implements User {
  @Column({ unique: true })
  public email!: string;

  @Column()
  public firstname!: string;

  @Column()
  public lastname!: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public role?: Role = Role.User;

  @Column({ nullable: true })
  public image?: string;
}
