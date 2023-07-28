import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaService } from './config/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';

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
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
