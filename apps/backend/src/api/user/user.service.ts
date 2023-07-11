import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@naite/types';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  public constructor(@Inject(REQUEST) private request: { user: User }) {}

  public async getUsers(relations?: string[]): Promise<User[]> {
    const allUsers = await this.repository.find({ relations });

    return allUsers;
  }

  public async getUserById(id: string, relations?: string[]): Promise<User> {
    const user = await this.repository.findOne({ where: { id }, relations });

    if (!user) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    if (!this.hasAccessToUser(user)) {
      throw new ForbiddenException();
    }

    return user;
  }

  public async createUser(data: User): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);

    return user;
  }

  public async deleteUserById(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    return result;
  }

  public async updateUserById(id: string, data: Partial<User>): Promise<User> {
    const userToUpdate = await this.getUserById(id, ['salaries', 'costs']);

    if (!userToUpdate) {
      throw new NotFoundException([`User with id ${id} not found`]);
    }

    await this.repository.update(id, data);

    return this.getUserById(id);
  }

  private hasAccessToUser(responseUser: User): boolean {
    const requestUser = this.request.user;

    return (
      requestUser.role === Role.Admin ||
      (requestUser.role === Role.User && requestUser.id === responseUser.id)
    );
  }
}
