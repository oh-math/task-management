import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserModel } from 'src/common/models/user.model';

@Injectable()
export class UserRepository implements IUser {
  constructor(private readonly prisma: PrismaService) {}

  public async create(input: CreateUserDto): Promise<UserModel> {
    return await this.prisma.user.create({
      data: input,
    });
  }

  public async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async findByIdOrEmail(input: string): Promise<UserModel> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ user_id: input }, { email: input }],
      },
    });
  }
  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        user_id: id,
      },
    });
  }

  public async update(id: string, input: UpdateUserDto): Promise<UserModel> {
    return await this.prisma.user.update({
      where: {
        user_id: id,
      },
      data: { ...input },
    });
  }
}
