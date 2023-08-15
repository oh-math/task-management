import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';

import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUser {
  constructor(private readonly prisma: PrismaService) {}

  public async create(input: CreateUserDto): Promise<UserModel> {
    return await this.prisma.client.user.create({
      data: input,
    });
  }

  public async findMany(): Promise<UserModel[]> {
    return await this.prisma.client.user.findMany();
  }

  public async findUnique(
    options: Prisma.UserFindUniqueOrThrowArgs,
  ): Promise<UserModel> {
    return this.prisma.client.user.findUniqueOrThrow(options);
  }

  public async findByIdOrEmail(input: string): Promise<UserModel> {
    return await this.prisma.client.user.findFirst({
      where: {
        OR: [{ user_id: input }, { email: input }],
      },
    });
  }
  public async delete(id: string): Promise<void> {
    await this.prisma.client.user.delete({
      where: {
        user_id: id,
      },
    });
  }

  public async update(id: string, input: UpdateUserDto): Promise<UserModel> {
    return await this.prisma.client.user.update({
      where: {
        user_id: id,
      },
      data: { ...input },
    });
  }
}
