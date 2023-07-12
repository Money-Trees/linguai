import { Lesson, User } from '@naite/types';
import { Column, Entity } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';

@Entity('lesson')
export class LessonEntity extends DocumentEntity implements Lesson {
  @Column()
  public name: string;

  @Column({ type: 'uuid' })
  public userId!: User['id'];
}
