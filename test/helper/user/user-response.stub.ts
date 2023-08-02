import { UserResponse } from '@user/dtos';
import { email, fullName, user_id } from './user-properties-generator';

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

export { userResponseStub};
