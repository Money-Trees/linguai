import { Language, Lesson, Task, Subtopic, User } from '@naite/types';
import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';
import { TaskEntity } from '../task/task.entity';

@Entity('lesson')
export class LessonEntity extends DocumentEntity implements Lesson {
  @Column()
  public name: string;

  @Column({ type: 'uuid' })
  public userId!: User['id'];

  @Column({
    type: 'enum',
    enum: Language,
  })
  public language: Language;

  @Column()
  public theme: string;

  @Column({
    type: 'varchar',
  })
  public subtopic: Subtopic;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.lesson)
  public readonly tasks: Task[];
}
