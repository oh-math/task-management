import { join } from 'path';

const NODE_ENV = process.env.NODE_ENV;
const rootDir = process.cwd();

let envPath: string;

if (NODE_ENV === 'dev') envPath = join(rootDir, '/.env.dev');
else if (NODE_ENV === 'prod') envPath = join(rootDir, '/.env.prod');

export default envPath;
