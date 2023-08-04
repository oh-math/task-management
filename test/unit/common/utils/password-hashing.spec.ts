import { hashPassword } from '@utils/password-hashing';
import { compare } from 'bcrypt';
import { password } from 'test/helper/user';

describe('hashPassword', () => {
  it('should hash password', async () => {
    const notHashedPassword = password;
    const hashedPassword = await hashPassword(notHashedPassword);

    const isPasswordValid = await compare(notHashedPassword, hashedPassword);

    expect(hashedPassword).toBeDefined();
    expect(isPasswordValid).toBeTruthy();
  });

  test('should handle invalid input', async () => {
    await expect(hashPassword(null)).rejects.toThrow();
  });

});
