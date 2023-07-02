import { UserModel } from 'src/models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos';

export interface IUser {
  create(input: CreateUserDto): Promise<UserModel>;

  findMany(): Promise<UserModel[]>;

  findByIdOrEmail(input: string): Promise<UserModel>;

  delete(id: string): Promise<void>;

  update(id: string, input: UpdateUserDto): Promise<UserModel>;
}
