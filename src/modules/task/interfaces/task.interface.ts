import { TaskModel } from '@models/task.model';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { FindUniqueOptions } from 'src/common/types/find-unique-options.type';

export interface ITask {
  create(input: CreateTaskDto, expDate: Date): Promise<TaskModel>;
  findMany(): Promise<TaskModel[]>;
  findUnique(options: FindUniqueOptions): Promise<TaskModel>;
  delete(id: string): Promise<void>;
  update(id: string, input: UpdateTaskDto): Promise<TaskModel>;
}
