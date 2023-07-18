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
import { Lesson } from '@naite/types';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { UpdateLessonDto, LessonDto } from './lesson.dto';
import { LessonService } from './lesson.service';

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  public constructor(private readonly lessonService: LessonService) {}

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiOkResponse({ type: LessonDto, isArray: true })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getLessons(
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<Lesson[]> {
    return this.lessonService.getLessons(select);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({ type: LessonDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  public async createLesson(@Body() body: LessonDto): Promise<Lesson> {
    return this.lessonService.createLesson(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async deleteLessonById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.lessonService.deleteLessonById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiOkResponse({ type: LessonDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getLessonById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<Lesson> {
    return this.lessonService.getLessonById(id, select);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by id' })
  @ApiOkResponse({ type: LessonDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async updateLessonById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateLessonDto
  ): Promise<Lesson> {
    return this.lessonService.updateLessonById(id, data);
  }
}
