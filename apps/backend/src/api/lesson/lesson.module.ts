import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from './lesson.controller';
import { LessonEntity } from './lesson.entity';
import { LessonService } from './lesson.service';
import { UserEntity } from '../user/user.entity';
import { OpenAiService } from './openai.service';
import { TaskModule } from '../task/task.module';
@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity, UserEntity]), TaskModule],
  controllers: [LessonController],
  providers: [LessonService, OpenAiService],
  exports: [LessonService],
})
export class LessonModule {}
