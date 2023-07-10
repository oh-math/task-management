import { AuthenticationController } from '@authentication/authentication.controller';
import { AuthenticationService } from '@authentication/authentication.service';
import { UserModelRequest } from '@interfaces/user-model-request.interface';
import { Test } from '@nestjs/testing';
import { FAKE_TOKEN } from 'test/helper';
import { userModelStub } from 'test/helper/user-raw.stub';

describe('AuthenticationController', () => {
  let authenticationService: AuthenticationService;
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            generateToken: jest.fn().mockResolvedValue(null),
          },
        },
      ],
      controllers: [AuthenticationController],
    }).compile();

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
    authenticationController = moduleRef.get<AuthenticationController>(
      AuthenticationController,
    );
  });

  describe('login', () => {
    let userFake: UserModelRequest;

    beforeAll(() => {
      userFake = {
        user: userModelStub(),
      } as UserModelRequest;
    });

    it('should return object token', async () => {
      jest
        .spyOn(authenticationService, 'generateToken')
        .mockReturnValue({ token: FAKE_TOKEN });

      const loginToken = await authenticationController.login(userFake);

      expect(loginToken).toMatchObject({
        token: expect.any(String),
      });
    });
  });
});
