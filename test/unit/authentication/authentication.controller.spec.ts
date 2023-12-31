import { AuthenticationController } from '@authentication/authentication.controller';
import { AuthenticationService } from '@authentication/authentication.service';
import { UserModelRequest } from '@common/interfaces';
import { Test } from '@nestjs/testing';
import { FAKE_TOKEN } from 'test/helper/fake-token';
import { userModelStub } from 'test/helper/user';

describe('AuthenticationController', () => {
  let authenticationService: AuthenticationService;
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            generateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
    authenticationController = new AuthenticationController(authenticationService)
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined()
    expect(authenticationController).toBeDefined()
  })

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
