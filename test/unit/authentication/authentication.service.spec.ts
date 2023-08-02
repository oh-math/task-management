import { AuthenticationService } from '@authentication/authentication.service';
import { UserModel } from '@models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserRepository } from '@user/user.repository';
import { hash } from 'bcrypt';
import { FAKE_TOKEN } from 'test/helper/fake-token';
import {
  email as fakerEmail,
  password as fakerPassword,
  userModelStub,
} from 'test/helper/user';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UserRepository,
          useValue: {
            findUnique: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(null),
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

  it('should be defined', () => {
    expect(jwtService).toBeDefined();
    expect(authenticationService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    let userFake: UserModel;

    beforeAll(async () => {
      userFake = userModelStub();
    });

    it('when a `UserModel` object is given, should return a token object', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue(FAKE_TOKEN);

      const generatedToken = authenticationService.generateToken(userFake);

      expect(generatedToken).toMatchObject({
        token: expect.any(String),
      });
    });
  });

  describe('validateUserEmailAndPassword', () => {
    let userFake: UserModel;
    const password = fakerPassword;

    beforeAll(async () => {
      const hashedPassword = await hash(password, 10);

      userFake = userModelStub({ password: hashedPassword });
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

    it('should return null when password is wrong', async () => {
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
