import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dtos';
import { UserRepository } from './user.repository';
import { hashPassword } from '@utils/password-hashing';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(input: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await hashPassword(input.password);

    const finalUser: CreateUserDto = { ...input, password: hashedPassword };

    const result = await this.userRepository.create(finalUser);

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
}
