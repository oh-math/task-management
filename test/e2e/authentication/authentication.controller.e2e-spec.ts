import { PrismaService } from '@config/prisma/prisma.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UserResponse } from '@user/dtos';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { createUserStub, password } from 'test/helper/user';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    userRepository = new UserRepository(prisma);
    userService = new UserService(userRepository);
  });

  describe('/api/auth/login', () => {
    const userPassword = password;
    let user: UserResponse;
    let createdUser: CreateUserDto;

    beforeEach(async () => {
      createdUser = createUserStub({ password: userPassword });

      user = await userService.create(createdUser);
    });

    afterEach(async () => {
      const { user_id } = user;

      await userService.delete(user_id);
    });

    it('(POST) should login user', async () => {

      const { email, password } = createdUser;
      const uri = '/api/auth/login';

      await request(app.getHttpServer())
        .post(uri)
        .send({ email, password })
        .expect(HttpStatus.CREATED);
    });
  });
});
