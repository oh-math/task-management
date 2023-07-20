import { ProjectModel } from '@models/project.model';
import { FindUniqueOptions } from 'src/common/types/find-unique-options.type';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';

export interface IProject {
  create(input: CreateProjectDto): Promise<ProjectModel>;
  findMany(): Promise<ProjectModel[]>;
  findUnique(options: FindUniqueOptions): Promise<ProjectModel>;
  delete(id: string): Promise<void>;
  update(id: string, input: UpdateProjectDto): Promise<ProjectModel>;
}
