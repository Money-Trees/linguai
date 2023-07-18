import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Lesson, Task, TaskType } from '@naite/types';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { DocumentDto } from '../../database/document.dto';

export class TaskDto extends DocumentDto implements Task {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  public lessonId!: Lesson['id'];

  @IsString()
  @ApiProperty({ example: 'My Task!' })
  public answer: string;

  @IsString()
  @ApiProperty({ example: 'My Answer!' })
  public question: string;

  @IsEnum(TaskType)
  @ApiProperty({
    example: TaskType.Cloze,
  })
  public type: TaskType;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
