import { UserPermissionPipe } from '@common/pipes';
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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/common/guards';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskService } from './task.service';
import { TaskPermissionPipe } from 'src/common/pipes/task-permission.pipe';

@UseGuards(JWTAuthGuard)
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() input: CreateTaskDto): Promise<TaskResponseDto> {
    return await this.taskService.create(input);
  }

  @Get()
  public async findAll(): Promise<TaskResponseDto[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return await this.taskService.findUnique(id);
  }

  @UsePipes(TaskPermissionPipe)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.taskService.delete(id);
  }

  @UsePipes(TaskPermissionPipe)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() input: UpdateTaskDto) {
    return await this.taskService.update(id, input);
  }
}
