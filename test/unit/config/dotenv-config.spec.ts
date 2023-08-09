import { configureDotenvPath, getDotenvPath } from '@config/dotenv-config';

describe('dotenv-config.ts', () => {
  const allAfterLastBackslashRegex = /[^/]*$/;

  let OLD_NODE_ENV: string;

  beforeEach(() => {
    OLD_NODE_ENV = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = OLD_NODE_ENV;
  });

  describe('getDotenvPath()', () => {
    it('should return path containing `.env.dev` file when NODE_ENV is set to `dev`', () => {
      process.env.NODE_ENV = 'dev';

      const dotenvPath = getDotenvPath();

      const match = dotenvPath.match(allAfterLastBackslashRegex);

      const result = match ? match[0] : '';

      expect(result).toBe('.env.dev');
    });

    it('should return path containing `.env.prod` file when NODE_ENV is set to `prod`', () => {
      process.env.NODE_ENV = 'prod';

      const dotenvPath = getDotenvPath();

      const match = dotenvPath.match(allAfterLastBackslashRegex);

      const result = match ? match[0] : '';

      expect(result).toBe('.env.prod');
    });

    it('should return undefined when NODE_ENV is not set`', () => {
      process.env.NODE_ENV = undefined;

      const dotenvPath = getDotenvPath();

      expect(dotenvPath).toBeUndefined();
    });
  });

  describe('configureDotenvPath()', () => {
    beforeEach(() => {
      process.env = {};
    });

    it('should match the MY_ENVIROMENT variable with the string `development` when NODE_ENV is set to `dev`', () => {
      process.env.NODE_ENV = 'dev';

      configureDotenvPath();

      expect(process.env.MY_ENVIROMENT).toBe('development');
    });

    it('should match the MY_ENVIROMENT variable with the string `production` when NODE_ENV is set to `prod`', () => {
      process.env.NODE_ENV = 'prod';

      configureDotenvPath();

      expect(process.env.MY_ENVIROMENT).toBe('production');
    });

    it('should match empty object when NODE_ENV is not set`', () => {
      configureDotenvPath();

      expect(process.env).toMatchObject({});
    });
  });
});
