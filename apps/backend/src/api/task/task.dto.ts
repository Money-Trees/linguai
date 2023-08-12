import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Lesson, Task, TaskType } from '@dialoq/types';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentDto } from '../../database/document.dto';

export class TaskDto extends DocumentDto implements Task {
  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  public lessonId!: Lesson['id'];

  @IsString()
  @ApiProperty({ example: 'My Answer!' })
  public question: string;

  @IsString()
  @ApiProperty({ example: 'My translation!' })
  public translation: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ example: ['option1', 'option2', 'option3'] })
  @ApiProperty({ example: 'My translation!' })
  public options?: string;

  @IsEnum(TaskType)
  @ApiProperty({
    example: TaskType.Cloze,
  })
  public type: TaskType;

  @IsBoolean()
  @ApiProperty({ example: false })
  public isCompleted?: boolean;

  @IsString()
  @ApiProperty({ example: 'Die' })
  public answer: string;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}
