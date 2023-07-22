import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaService } from './config/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';

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
    ProjectModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
