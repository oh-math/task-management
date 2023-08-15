import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaClient],
  exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
