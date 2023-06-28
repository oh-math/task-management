import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UserResponse } from './dtos';
import { UserRepository } from './user.repository';
import { hashSync } from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async create(input:CreateUserDto): Promise<UserResponse> {
    input.password = hashSync(input.password, 10)

    const result = this.userRepository.create(input)

   return plainToInstance(UserResponse, result)
  }
}
