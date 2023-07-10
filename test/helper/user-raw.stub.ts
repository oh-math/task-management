import { faker } from '@faker-js/faker';
import { UserModel } from '@models/user.model';
import { randomUUID } from 'crypto';

const user_id = randomUUID();
const password = faker.internet.password({ length: 10, memorable: true });
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();

function userModelStub(fields?: Partial<UserModel>): UserModel {
  return {
    user_id,
    email,
    password,
    name: faker.person.fullName({ firstName, lastName }),
    createdAt: new Date(),
    updatedAt: new Date(),

    ...fields,
  };
}

export { userModelStub, user_id, password, firstName, lastName, email };
