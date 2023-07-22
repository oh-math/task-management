import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectService, ProjectRepository, PrismaService],
  controllers: [ProjectController],
})
export class ProjectModule {}
