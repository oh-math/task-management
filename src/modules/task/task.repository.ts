import { PrismaService } from '@config/prisma/prisma.service';
import { TaskModel } from '@models/task.model';
import { Injectable } from '@nestjs/common';
import { FindUniqueOptions } from 'src/common/types/find-unique-options.type';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TaskRepository implements ITask {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(input: CreateTaskDto, expDate: Date): Promise<TaskModel> {
    return await this.prismaService.client.task.create({
      data: {
        expiration_date: expDate,
        ...input,
      },
    });
  }
  public async findUnique(options: FindUniqueOptions): Promise<TaskModel> {
    return await this.prismaService.client.task.findUnique(options);
  }
  public async findMany(): Promise<TaskModel[]> {
    return await this.prismaService.client.task.findMany();
  }
  public async delete(id: string): Promise<void> {
    await this.prismaService.client.task.delete({
      where: {
        task_id: id,
      },
    });
  }
  public async update(id: string, input: UpdateTaskDto): Promise<TaskModel> {
    return await this.prismaService.client.task.update({
      data: input,
      where: {
        task_id: id,
      },
    });
  }
}
