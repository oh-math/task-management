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
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/common/guards';
import { CreateProjectDto, ProjectResponseDto, UpdateProjectDto } from './dtos';
import { ProjectService } from './project.service';

@UseGuards(JWTAuthGuard)
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async create(
    @Body() input: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.projectService.create(input);
  }
  @Get()
  public async findAll(): Promise<ProjectResponseDto[]> {
    return this.projectService.findAll();
  }
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectService.findUnique(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    await this.projectService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Body() input: UpdateProjectDto,
    @Param('id') id: string,
  ): Promise<ProjectResponseDto> {
    return this.projectService.update(id, input);
  }
}
