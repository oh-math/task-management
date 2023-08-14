import { UserResponse } from '@user/dtos';

export function userResponseMatcher(fields?: Partial<UserResponse>) {
  return {
    user_id: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),

    ...fields,
  };
}
