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
import { Lesson, Role } from '@naite/types';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { UpdateLessonDto, LessonDto } from './lesson.dto';
import { LessonService } from './lesson.service';
import { Roles } from '../auth/roles.decorator';

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  public constructor(private readonly lessonService: LessonService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Get all lessons',
    description: 'Access only by Admin',
  })
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

  @Get(':userId')
  @ApiOperation({
    summary: 'Get all lessons by userId',
    description: 'Access only by Admin or the user itself',
  })
  @ApiOkResponse({ type: LessonDto, isArray: true })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getLessonsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<Lesson[]> {
    return this.lessonService.getLessonsByUserId(userId, select);
  }

  @Post()
  @ApiOperation({ summary: 'Create a lesson' })
  @ApiCreatedResponse({ type: LessonDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  public async createLesson(@Body() body: LessonDto): Promise<Lesson> {
    return this.lessonService.createLesson(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson by id' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async deleteLessonById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.lessonService.deleteLessonById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lesson by id' })
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
  @ApiOperation({ summary: 'Update a lesson by id' })
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
