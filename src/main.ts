import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 3001;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(PinoLogger));
  app.flushLogs();
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
}
bootstrap();
