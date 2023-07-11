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
import { Role, User } from '@naite/types';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserDto, isArray: true })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getUsers(
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<User[]> {
    return this.userService.getUsers(select);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  public async createUser(@Body() body: UserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async deleteUserById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiQuery({
    name: 'select',
    required: false,
    description: 'Return related objects',
  })
  public async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query(
      'select',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    select?: string[]
  ): Promise<User> {
    return this.userService.getUserById(id, select);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  public async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUserById(id, data);
  }
}
