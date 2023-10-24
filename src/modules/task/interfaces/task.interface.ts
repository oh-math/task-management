import { TaskModel } from '@models/task.model';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { FindUniqueOptions } from 'src/common/types/find-unique-options.type';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

export interface ITask {
  count(options?: Prisma.TaskCountArgs): Promise<number>
  create(input: CreateTaskDto, expDate: Date): Promise<TaskModel>;
  findMany(request: Request): Promise<TaskModel[]>;
  findUnique(options: FindUniqueOptions): Promise<TaskModel>;
  delete(id: string): Promise<void>;
  update(id: string, input: UpdateTaskDto): Promise<TaskModel>;
}
