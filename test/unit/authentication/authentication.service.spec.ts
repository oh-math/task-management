import { AuthenticationService } from '@authentication/authentication.service';
import { UserModel } from '@models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserRepository } from '@user/user.repository';
import { hash } from 'bcrypt';
import {
  email as fakerEmail,
  password as fakerPassword,
  userRawFake,
} from 'test/helper/user-raw.stub';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        JwtService,
        {
          provide: UserRepository,
          useValue: {
            findUnique: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUserEmailAndPassword', () => {
    let userFake: UserModel;
    const password = fakerPassword;

    beforeAll(async () => {
      const hashedPassword = await hash(password, 10);

      userFake = userRawFake({ password: hashedPassword });
    });
    it('should return null when user does not exists', async () => {
      jest.spyOn(userRepository, 'findUnique').mockResolvedValue(null);

      const validationResult =
        await authenticationService.validateUserEmailAndPassword(
          fakerEmail,
          fakerPassword,
        );

      expect(validationResult).toBeNull();
    });

    it('should return null when user does not exists', async () => {
      const wrongPassword = '123';
      jest.spyOn(userRepository, 'findUnique').mockResolvedValue(userFake);

      const validationResult =
        await authenticationService.validateUserEmailAndPassword(
          fakerEmail,
          wrongPassword,
        );

      expect(validationResult).toBeNull();
    });

    it('should return a `UserModel` when user exists and passwords match', async () => {
      jest.spyOn(userRepository, 'findUnique').mockResolvedValue(userFake);

      const validatedResult =
        await authenticationService.validateUserEmailAndPassword(
          userFake.email,
          password,
        );

      expect(validatedResult).toMatchObject<UserModel>(
        expect.objectContaining({
          email: expect.any(String),
          password: expect.any(String),
        }),
      );
    });
  });
});
