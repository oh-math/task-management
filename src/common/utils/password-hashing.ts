import { hash } from 'bcrypt';

export function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return hash(password, saltRounds);
}
