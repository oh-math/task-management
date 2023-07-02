import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dtos';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(input: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await this.hashPassword(input.password);
    const user = { password: hashedPassword, ...input };

    const result = await this.userRepository.create(user);

    return plainToInstance(UserResponse, result);
  }

  public async findAll(): Promise<UserResponse[]> {
    const result = await this.userRepository.findMany();

    return plainToInstance(UserResponse, result);
  }

  public async findByIdOrEmail(input: string): Promise<UserResponse> {
    const result = await this.userRepository.findByIdOrEmail(input);

    return plainToInstance(UserResponse, result);
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async update(id: string, input: UpdateUserDto): Promise<UserResponse> {
    const result = await this.userRepository.update(id, input);

    return plainToInstance(UserResponse, result);
  }

  async hashPassword(password: string): Promise<String> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}
