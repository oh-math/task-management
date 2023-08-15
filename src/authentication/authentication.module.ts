import { forRootObject } from '@config/env-config';
import { PrismaModule } from '@config/prisma/prisma.module';
import { PrismaService } from '@config/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';
import { UserRepository } from '@user/user.repository';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(forRootObject),
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30min' },
    }),
    PrismaModule,
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    UserRepository,
    PrismaService,
    JwtStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
