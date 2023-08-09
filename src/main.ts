import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { configureDotenvPath } from '@config/dotenv-config';
import { PrismaService } from '@config/prisma/prisma.service';
configureDotenvPath();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3001;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const prismaService = app.get(PrismaService);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();
  app.getHttpAdapter().getInstance().set('json spaces', 2);

  await prismaService.enableShutdownHooks(app);
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
  logger.log(`Running on ${NODE_ENV.toUpperCase()} environment`);
}

bootstrap();
