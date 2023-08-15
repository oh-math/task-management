import { PrismaService } from '@config/prisma/prisma.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@user/dtos';
import { UserModule } from '@user/user.module';
import { UserRepository } from '@user/user.repository';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { createUserStub, email as emailFaker, password } from 'test/helper/user';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    userRepository = new UserRepository(prisma);
  });

  describe('/api/users', () => {
    const userPassword = password;
    const uri = '/api/users';

    let user: CreateUserDto;

    beforeEach(() => {
      user = createUserStub({ password: userPassword });
    });

    it('(POST) should create User', async () => {
      const { email } = user;

      await request(app.getHttpServer())
        .post(uri)
        .send(user)
        .expect(HttpStatus.CREATED);

      const { user_id } = await userRepository.findByIdOrEmail(email);
      await userRepository.delete(user_id);
    });

    it('(DELETE) should require authorization', async () => {
      const { user_id } = await userRepository.create(user);

      await request(app.getHttpServer())
        .delete(`${uri}/${user_id}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
