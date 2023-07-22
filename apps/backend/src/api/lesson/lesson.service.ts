import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson, Prompt, Role, Task, TaskType, User } from '@naite/types';
import { DeleteResult, Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { UserEntity } from '../user/user.entity';
import { OpenAiService } from './openai.service';
import { TaskService } from '../task/task.service';
import { lessonPromptTemplate } from './lesson.prompt-template';

@Injectable()
export class LessonService {
  @InjectRepository(LessonEntity)
  private readonly repository: Repository<LessonEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @Inject(OpenAiService)
  private readonly openAiService: OpenAiService;

  @Inject(TaskService)
  private readonly taskService: TaskService;

  public constructor(@Inject(REQUEST) private request: { user: User }) {}

  public async getLessons(relations?: string[]): Promise<Lesson[]> {
    const userId = this.request.user.id;

    return this.repository.find({ relations, where: { userId } });
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
    const userId = this.request.user.id;
    const lesson = this.repository.create({ ...data, userId });
    await this.repository.save(lesson);

    const responseString = await this.openAiService.createChatCompletion(
      new Prompt(lessonPromptTemplate, lesson)
    );

    const tasks = responseString
      .trim()
      .split('\n')
      .map((line): Partial<Task> => {
        return this.parseOpenApiResponseForClozeTask(line, lesson);
      });

    const taskEntities = await this.taskService.createTasks(tasks);

    console.log(responseString);
    console.log(taskEntities);

    return { ...lesson, tasks: taskEntities };
  }

  public async deleteLessonById(id: string): Promise<DeleteResult> {
    // check if lesson exists and user has access
    await this.getLessonById(id);

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
    const lessonToUpdate = await this.getLessonById(id);

    if (!lessonToUpdate) {
      throw new NotFoundException([`Lesson with id ${id} not found`]);
    }

    await this.repository.update(id, data);

    return this.getLessonById(id);
  }

  private parseOpenApiResponseForClozeTask(
    line: string,
    lesson: LessonEntity
  ): Partial<Task> {
    const lineWithoutNumberIndex = line.replace(/^\d+\.\s/, '');
    const [question, translation] = lineWithoutNumberIndex.split(' - ');

    const wordsInSquareBracketsRegEx = /(\[.*?\])/g;
    const modelAnswerWithBracketsMatches = question.match(
      wordsInSquareBracketsRegEx
    );

    const modelAnswers = modelAnswerWithBracketsMatches?.map((ma) =>
      ma.replace(/[\\[\]]/g, '').trim()
    );

    if (!modelAnswers || modelAnswers.length === 0 || !question) {
      throw new Error(`Invalid line format: ${line}`);
    }

    return {
      question,
      modelAnswers: modelAnswers.join(', '),
      translation,
      type: TaskType.Cloze,
      lessonId: lesson.id,
    };
  }

  private hasAccessToLesson(lesson: Lesson): boolean {
    const requestUser = this.request.user;

    return (
      requestUser.role === Role.Admin ||
      (requestUser.role === Role.User && requestUser.id === lesson.userId)
    );
  }
}
