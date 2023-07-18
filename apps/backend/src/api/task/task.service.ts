import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, User } from '@naite/types';
import { DeleteResult, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class TaskService {
  @InjectRepository(TaskEntity)
  private readonly repository: Repository<TaskEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  public constructor(@Inject(REQUEST) private request: { user: User }) {}

  public async getTasks(relations?: string[]): Promise<Task[]> {
    return this.repository.find({ relations });
  }

  public async getTaskById(id: string, relations?: string[]): Promise<Task> {
    const task = await this.repository.findOne({ where: { id }, relations });

    if (!task) {
      throw new NotFoundException([`Task with id ${id} not found`]);
    }

    return task;
  }

  public async createTask(data: Task): Promise<Task> {
    const task = this.repository.create(data);
    await this.repository.save(task);

    return task;
  }

  public async createTasks(tasks: Partial<Task>[]): Promise<Task[]> {
    return Promise.all(
      tasks.map((task) => {
        const taskEntity = this.repository.create(task);

        return this.repository.save(taskEntity);
      })
    );
  }

  public async deleteTaskById(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException([`Task with id ${id} not found`]);
    }

    return result;
  }

  public async updateTaskById(id: string, data: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.getTaskById(id, ['salaries', 'costs']);

    if (!taskToUpdate) {
      throw new NotFoundException([`Task with id ${id} not found`]);
    }

    await this.repository.update(id, data);

    return this.getTaskById(id);
  }
}
