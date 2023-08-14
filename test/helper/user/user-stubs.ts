import { UserModel } from '@models/user.model';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@user/dtos/index';
import {
    email,
    fullName,
    password,
    user_id,
} from './user-properties-generator';

function createUserStub(fields?: Partial<CreateUserDto>): CreateUserDto {
  return {
    email,
    name: fullName,
    password,

    ...fields,
  };
}

function updateUserStub(fields?: Partial<UpdateUserDto>): UpdateUserDto {
  return {
    ...createUserStub(),

    ...fields,
  };
}

function userResponseStub(fields?: Partial<UserResponse>): UserResponse {
  return {
    user_id,
    email,
    name: fullName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    ...fields,
  };
}

function userModelStub(fields?: Partial<UserModel>): UserModel {
  return {
    user_id,
    email,
    password,
    name: fullName,
    createdAt: new Date(),
    updatedAt: new Date(),

    ...fields,
  };
}

export { createUserStub, updateUserStub, userModelStub, userResponseStub };

