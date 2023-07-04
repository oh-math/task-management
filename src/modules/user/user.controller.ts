import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dtos';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() input: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(input);
  }

  @Get()
  public async findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Get('by-id-or-email/:id')
  public async findByIdOrEmail(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findByIdOrEmail(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
   this.userService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Body() input: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    return this.userService.update(id, input);
  }
}
