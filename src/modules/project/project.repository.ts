import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IProject } from './interfaces/project.interface';
import { ProjectModel } from '@models/project.model';
import { FindUniqueOptions } from 'src/common/types/find-unique-options.type';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectRepository implements IProject {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(input: CreateProjectDto): Promise<ProjectModel> {
    return await this.prismaService.project.create({ data: input });
  }
  public async findMany(): Promise<ProjectModel[]> {
    return await this.prismaService.project.findMany();
  }
  public async findUnique(
    options: Prisma.ProjectFindUniqueOrThrowArgs,
  ): Promise<ProjectModel> {
    return await this.prismaService.project.findUniqueOrThrow(options);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.project.delete({
      where: {
        project_id: id,
      },
    });
  }
  public async update(
    id: string,
    input: UpdateProjectDto,
  ): Promise<ProjectModel> {
    return await this.prismaService.project.update({
      where: {
        project_id: id,
      },
      data: { ...input },
    });
  }
}
