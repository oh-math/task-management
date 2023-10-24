import { Injectable } from '@nestjs/common';
import { skipDay } from '@utils/date-formatting';
import { taskIncludes } from '@utils/task-includes';
import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskRepository } from './task.repository';
import { Request } from 'express';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

public async count(): Promise<number> {
  return this.taskRepository.count()
}

  public async create(input: CreateTaskDto): Promise<TaskResponseDto> {
    const todayPlusOne = skipDay(1);

    const task = await this.taskRepository.create(input, todayPlusOne);

    return plainToInstance(TaskResponseDto, task);
  }

  public async findUnique(id: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findUnique({
      where: {
        task_id: id,
      },
      include: taskIncludes,
    });

    return plainToInstance(TaskResponseDto, task);
  }

  public async findAll(request: Request): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.findMany(request);

    return plainToInstance(TaskResponseDto, tasks);
  }

  public async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  public async update(
    id: string,
    input: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.taskRepository.update(id, input);

    return plainToInstance(TaskResponseDto, task);
  }
}
