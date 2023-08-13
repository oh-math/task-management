import { AuthenticationService } from '@authentication/authentication.service';
import { LocalStrategy } from '@authentication/strategies';
import { UserModel } from '@models/user.model';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  email as fakerEmail,
  password as fakerPassword,
  userModelStub,
} from 'test/helper/user';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthenticationService,
          useValue: {
            validateUserEmailAndPassword: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    localStrategy = moduleRef.get<LocalStrategy>(LocalStrategy);
    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe('validate', () => {
    let userFake: UserModel;
    let inputEmail = fakerEmail;
    let inputPassword = fakerPassword;

    beforeEach(() => {
      userFake = userModelStub({ email: inputEmail, password: inputPassword });
    });

    it('should call `validateUserEmailAndPassword` from `AuthenticationService`', async () => {
      await localStrategy.validate(inputEmail, inputPassword);

      expect(
        authenticationService.validateUserEmailAndPassword,
      ).toHaveBeenCalledTimes(1);
      expect(
        authenticationService.validateUserEmailAndPassword,
      ).toHaveBeenCalledWith(inputEmail, inputPassword);
    });

    it('should return `UserModel` when incoming user is not null', async () => {
      jest
        .spyOn(authenticationService, 'validateUserEmailAndPassword')
        .mockResolvedValue(userFake);

      const validatedUser = await localStrategy.validate(
        inputEmail,
        inputPassword,
      );

      expect(validatedUser).toMatchObject(
        expect.objectContaining({
          email: inputEmail,
          password: inputPassword,
        }),
      );
    });

    it('should throw UnauthorizedException (401) when incoming user is null', async () => {
      jest
        .spyOn(authenticationService, 'validateUserEmailAndPassword')
        .mockResolvedValue(null);

      const validatedUSer = localStrategy.validate(inputEmail, inputPassword);

      await expect(validatedUSer).rejects.toThrow(UnauthorizedException);
      await expect(validatedUSer).rejects.toMatchObject({
        status: HttpStatus.UNAUTHORIZED,
        message: 'E-mail and/or password invalid',
      });
    });
  });
});
