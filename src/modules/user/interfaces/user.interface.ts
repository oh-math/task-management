import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserResponse } from '../dtos';
import { UserModel } from 'src/models/user.model';

export interface IUser {
  create(input: CreateUserDto): Promise<UserModel>;

  findMany(): Promise<User[]>;

  findByIdOrEmail(input: string): Promise<UserModel>;

  delete(id: string): Promise<void>;

  update(id: string, input: UpdateUserDto): Promise<UserModel>;
}
