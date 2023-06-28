import { Module } from '@nestjs/common';
import { PrismaService } from './config/prisma/prisma.service';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    UserModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
