import { UserModel } from '@models/user.model';
import {
  email,
  fullName,
  password,
  user_id,
} from './user-properties-generator';

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

export { userModelStub };
