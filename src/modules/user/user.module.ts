import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from '@config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
