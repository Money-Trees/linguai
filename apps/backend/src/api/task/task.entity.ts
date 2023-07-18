import { Lesson, Task, TaskType, User } from '@naite/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DocumentEntity } from '../../database/document.entity';
import { LessonEntity } from '../lesson/lesson.entity';

@Entity('task')
export class TaskEntity extends DocumentEntity implements Task {
  @Column()
  public modelAnswer: string;

  @Column()
  public question: string;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  public type: TaskType;

  @Column({ type: 'uuid' })
  public lessonId!: Lesson['id'];

  @ManyToOne(() => LessonEntity, (lessonEntity) => lessonEntity.tasks, {
    onDelete: 'CASCADE',
  })
  public readonly user!: User;

  @Column({ nullable: true })
  public isCompleted?: boolean;
}
