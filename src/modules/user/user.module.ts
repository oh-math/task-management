import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
    controllers: [UserController],
    providers: [PrismaService, UserService, UserRepository],
    exports: [UserService, UserRepository],
  })
  export class UserModule {}
  