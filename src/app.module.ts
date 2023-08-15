import { forRootObject } from '@config/env-config';
import { PrismaModule } from '@config/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
@Module({
  imports: [
    ConfigModule.forRoot(forRootObject),
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
    ProjectModule,
    AuthenticationModule,
    TaskModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
