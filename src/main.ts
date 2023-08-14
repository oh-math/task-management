import { AppModule } from './app.module';
import { PrismaService } from '@config/prisma/prisma.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  const NODE_ENV = configService.get('NODE_ENV');
  const PORT = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();
  app.getHttpAdapter().getInstance().set('json spaces', 2);

  await prismaService.enableShutdownHooks(app);
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
 
  logger.log(`Running on ${NODE_ENV.toUpperCase()} environment`);
}

bootstrap();
