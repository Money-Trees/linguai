import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonController } from './lesson.controller';
import { LessonEntity } from './lesson.entity';
import { LessonService } from './lesson.service';
import { UserEntity } from '../user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity, UserEntity])],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
