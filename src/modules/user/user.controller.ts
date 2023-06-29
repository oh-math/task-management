import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dtos';
import { UserPermissionPipe } from 'src/common/pipes';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() input: CreateUserDto): Promise<UserResponse> {
    return await this.userService.create(input);
  }

  @Get()
  public async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }

  @Get('by-id-or-email/:id')
  public async findByIdOrEmail(@Param('id') id: string): Promise<UserResponse> {
    return await this.userService.findByIdOrEmail(id);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Body() input: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    return await this.userService.update(id, input);
  }
}
