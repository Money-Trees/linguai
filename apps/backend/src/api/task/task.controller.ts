import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role, Task } from '@naite/types';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { Roles } from '../auth/roles.decorator';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Access only by admin',
  })
  @ApiOkResponse({ type: TaskDto, isArray: true })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getTasks(
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<Task[]> {
    return this.taskService.getTasks(select);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create a task',
    description: 'Access only by admin',
  })
  @ApiCreatedResponse({ type: TaskDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  public async createTask(@Body() body: TaskDto): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async deleteTaskById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.taskService.deleteTaskById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<Task> {
    return this.taskService.getTaskById(id, select);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by id' })
  @ApiOkResponse({ type: TaskDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async updateTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTaskDto
  ): Promise<Task> {
    return this.taskService.updateTaskById(id, data);
  }
}
