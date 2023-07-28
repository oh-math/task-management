import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma/prisma.service';
import configureDotenv from './config/env-config';

configureDotenv()

const NODE_ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3001;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const prismaService = app.get(PrismaService);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  await prismaService.enableShutdownHooks(app);
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
  logger.log(`Running on ${NODE_ENV.toUpperCase()} environment`);
}
bootstrap();
