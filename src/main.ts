import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';
import { PrismaService } from './config/prisma/prisma.service';

const PORT = process.env.PORT || 3001;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const prismaService = app.get(PrismaService);

  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  await prismaService.enableShutdownHooks(app);
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
}
bootstrap();
