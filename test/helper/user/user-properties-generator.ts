import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

const user_id = randomUUID();
const password = faker.internet.password({ length: 10, memorable: true });
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = faker.person.fullName({ firstName, lastName });
const email = faker.internet.email({ firstName, lastName });

export { email, firstName, fullName, lastName, password, user_id };
