import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson, Prompt, Role, User } from '@naite/types';
import { DeleteResult, Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { UserEntity } from '../user/user.entity';
import { OpenAiService } from './openai.service';
import { lessonPromptTemplate } from './lesson.prompt-template';

@Injectable()
export class LessonService {
  @InjectRepository(LessonEntity)
  private readonly repository: Repository<LessonEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @Inject(OpenAiService)
  private readonly openAiService: OpenAiService;

  public constructor(@Inject(REQUEST) private request: { user: User }) {}

  public async getLessons(relations?: string[]): Promise<Lesson[]> {
    return this.repository.find({ relations });
  }

  public async getLessonById(
    id: string,
    relations?: string[]
  ): Promise<Lesson> {
    const lesson = await this.repository.findOne({ where: { id }, relations });

    if (!lesson) {
      throw new NotFoundException([`Lesson with id ${id} not found`]);
    }

    if (!this.hasAccessToLesson(lesson)) {
      throw new ForbiddenException();
    }

    return lesson;
  }

  public async createLesson(data: Lesson): Promise<Lesson> {
    const lesson = this.repository.create(data);
    await this.repository.save(lesson);

    console.log(
      await this.openAiService.createChatCompletion(
        new Prompt(lessonPromptTemplate, lesson)
      )
    );

    return lesson;
  }

  public async deleteLessonById(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException([`Lesson with id ${id} not found`]);
    }

    return result;
  }

  public async updateLessonById(
    id: string,
    data: Partial<Lesson>
  ): Promise<Lesson> {
    const lessonToUpdate = await this.getLessonById(id, ['salaries', 'costs']);

    if (!lessonToUpdate) {
      throw new NotFoundException([`Lesson with id ${id} not found`]);
    }

    await this.repository.update(id, data);

    return this.getLessonById(id);
  }

  private hasAccessToLesson(lesson: Lesson): boolean {
    const requestUser = this.request.user;

    return (
      requestUser.role === Role.Admin ||
      (requestUser.role === Role.User && requestUser.id === lesson.userId)
    );
  }
}
