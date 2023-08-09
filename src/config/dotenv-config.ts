import { config } from 'dotenv';
import { join } from 'path';

function getDotenvPath(): string | undefined {
  const NODE_ENV = process.env.NODE_ENV;
  const rootDir = process.cwd();

  if (NODE_ENV === 'dev') return join(rootDir, '/.env.dev');
  if (NODE_ENV === 'prod') return join(rootDir, '/.env.prod');
}

function configureDotenvPath(): void {
  const dotenvPath = getDotenvPath();

  if (dotenvPath) {
    config({ path: dotenvPath });
  }
}

export { configureDotenvPath, getDotenvPath };

