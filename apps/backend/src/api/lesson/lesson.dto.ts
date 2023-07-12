import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Lesson, User } from '@naite/types';
import { IsString } from 'class-validator';
import { DocumentDto } from '../../database/document.dto';
import { Column } from 'typeorm';

export class LessonDto extends DocumentDto implements Lesson {
  @IsString()
  @ApiProperty({ example: 'My Lesson!' })
  public name: string;

  @Column({ type: 'uuid' })
  public userId!: User['id'];
}

export class UpdateLessonDto extends PartialType(LessonDto) {}
