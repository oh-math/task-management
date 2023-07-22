import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto, ProjectResponseDto, UpdateProjectDto } from './dtos';
import { ProjectRepository } from './project.repository';

const userIncludes = {
  user: {
    select: {
      user_id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async create(input: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.create(input);

    return plainToInstance(ProjectResponseDto, project);
  }

  public async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.findMany({
      include: userIncludes,
    });

    return plainToInstance(ProjectResponseDto, projects);
  }

  public async findUnique(id: string): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findUnique({
      where: {
        project_id: id,
      },
      include: userIncludes,
    });

    return plainToInstance(ProjectResponseDto, project);
  }

  public async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  public async update(
    id: string,
    input: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.update(id, input);

    return plainToInstance(ProjectResponseDto, project);
  }
}
