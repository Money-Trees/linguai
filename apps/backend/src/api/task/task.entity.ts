import { Lesson, Task, TaskType } from '@naite/types';
import { Column, Entity } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';

@Entity('task')
export class TaskEntity extends DocumentEntity implements Task {
  @Column()
  public answer: string;

  @Column()
  public question: string;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  public type: TaskType;

  @Column({ type: 'uuid' })
  public lessonId!: Lesson['id'];
}
