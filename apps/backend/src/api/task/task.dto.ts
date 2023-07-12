import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Lesson, Task, TaskType } from '@naite/types';
import { IsEnum, IsString } from 'class-validator';
import { DocumentDto } from '../../database/document.dto';
import { Column } from 'typeorm';

export class TaskDto extends DocumentDto implements Task {
  @Column({ type: 'uuid' })
  public lessonId!: Lesson['id'];

  @IsString()
  @ApiProperty({ example: 'My Task!' })
  public answer: string;

  @IsString()
  @ApiProperty({ example: 'My Task!' })
  public question: string;

  @IsEnum(TaskType)
  @ApiProperty({
    example: TaskType.Cloze,
  })
  public type: TaskType;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
