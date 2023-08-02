import { UpdateUserDto } from '@user/dtos';
import { createUserStub } from './create-user.stub';

function updateUserStub(fields?: Partial<UpdateUserDto>): UpdateUserDto {
  return {
    ...createUserStub(),

    ...fields,
  };
}

export { updateUserStub };
