import { config } from 'dotenv';
import { join } from 'path';

const NODE_ENV = process.env.NODE_ENV;
const rootDir = process.cwd();

function getDotenvPath(): string | undefined {
  if (NODE_ENV === 'dev') return join(rootDir, '/.env.dev');
  if (NODE_ENV === 'prod') return join(rootDir, '/.env.prod');
}

function configureDotenvPath(): void {
  const dotenvPath = getDotenvPath();
  
  if (dotenvPath) {
    config({ path: dotenvPath });
  }
}

export default configureDotenvPath;
