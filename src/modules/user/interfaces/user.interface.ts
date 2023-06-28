import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserResponse } from '../dtos';
import { UserModel } from 'src/common/models/user.model';

export interface IUser {
  create(input: CreateUserDto): Promise<UserModel>;

  findAll(): Promise<User[]>;

  findByIdOrEmail(input: string): Promise<UserModel>;

  delete(id: string): Promise<void>;

  update(id: string, input: UpdateUserDto): Promise<UserModel>;
}
