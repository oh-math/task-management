import { forRootObject } from '@config/env-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaService } from './config/prisma/prisma.service';
import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
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
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
