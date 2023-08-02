import { CreateUserDto } from '@user/dtos';
import { email, fullName, password } from './user-properties-generator';

function createUserStub(fields?: Partial<CreateUserDto>): CreateUserDto {
  return {
    email,
    name: fullName,
    password,

    ...fields,
  };
}

export { createUserStub };
