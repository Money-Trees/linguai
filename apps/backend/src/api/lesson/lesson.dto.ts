import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  GermanTopic,
  Language,
  Lesson,
  TaskType,
  Topic,
  User,
} from '@naite/types';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { DocumentDto } from '../../database/document.dto';

export class LessonDto extends DocumentDto implements Lesson {
  @IsString()
  @ApiProperty({ example: 'My Lesson!' })
  public name: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  public userId!: User['id'];

  @IsEnum(Language)
  @ApiProperty({
    example: TaskType.Cloze,
  })
  public language: Language;

  @IsString()
  @ApiProperty({ example: 'My Theme!' })
  public theme: string;

  @IsString()
  @ApiProperty({
    example: GermanTopic.Articles,
  })
  public topic: Topic;
}

export class UpdateLessonDto extends PartialType(LessonDto) {}
