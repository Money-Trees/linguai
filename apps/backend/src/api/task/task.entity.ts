import { Lesson, Task, TaskType } from '@naite/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';
import { LessonEntity } from '../lesson/lesson.entity';

@Entity('task')
export class TaskEntity extends DocumentEntity implements Task {
  @Column({ type: 'uuid' })
  public lessonId!: Lesson['id'];

  @Column()
  public modelAnswer: string;

  @Column()
  public question: string;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  public type: TaskType;

  @Column({ nullable: true })
  public isCompleted?: boolean;

  @ManyToOne(() => LessonEntity, (lessonEntity) => lessonEntity.tasks)
  public readonly lesson: Lesson;
}
