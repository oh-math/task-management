import { UserModel } from '@models/user.model';
import { Test } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@user/dtos';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import {
  createUserStub,
  updateUserStub,
  userModelStub,
  userResponseMatcher,
  user_id,
} from 'test/helper/user';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findByIdOrEmail: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    userService = new UserService(userRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  beforeEach(() => jest.clearAllMocks());

  describe('create', () => {
    let createUserInput: CreateUserDto;
    let userRaw: UserModel;

    beforeEach(() => {
      createUserInput = createUserStub();
      const { email, name, password } = createUserInput;

      userRaw = userModelStub({
        email,
        name,
        password,
      });

      jest.spyOn(userRepository, 'create').mockResolvedValue(userRaw);
    });

    it('should return promise of type `UserResponse`', async () => {
      const user = await userService.create(createUserInput);
      const { email, name } = createUserInput;

      expect(user).toMatchObject<UserResponse>(
        userResponseMatcher({
          email,
          name,
        }),
      );
    });

    it('should call `userRepository.create` 1 times', async () => {
      await userService.create(createUserInput);

      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.create).toBeCalledWith<[CreateUserDto]>({
        email: expect.any(String),
        password: expect.any(String),
        name: expect.any(String),
      });
    });
  });

  describe('findAll', () => {
    let userRaw: UserModel[];

    beforeEach(() => {
      userRaw = Array(userModelStub());

      jest.spyOn(userRepository, 'findMany').mockResolvedValue(userRaw);
    });

    it('should return promise of type `UserResponse[]`', async () => {
      const users = await userService.findAll();

      expect(users).toMatchObject<UserResponse[]>([userResponseMatcher()]);
    });

    it('should call `userRepository.findMany` 1 times', async () => {
      await userService.findAll();

      expect(userRepository.findMany).toBeCalledTimes(1);
    });
  });

  describe('findByIdOrEmail', () => {
    let userRaw: UserModel;
    const userId = user_id;

    beforeEach(() => {
      userRaw = userModelStub({
        user_id: userId,
      });

      jest.spyOn(userRepository, 'findByIdOrEmail').mockResolvedValue(userRaw);
    });

    it('should return promise of type `UserResponse`', async () => {
      const user = await userService.findByIdOrEmail(userId);

      expect(user).toMatchObject<UserResponse>(userResponseMatcher());
    });

    it('should call `userRepository.findByIdOrEmail` 1 times', async () => {
      await userService.findByIdOrEmail(userId);

      expect(userRepository.findByIdOrEmail).toBeCalledTimes(1);
      expect(userRepository.findByIdOrEmail).toBeCalledWith<[string]>(userId);
    });
  });

  describe('delete', () => {
    const userId = user_id;

    it('shoudl return void promise', async () => {
      expect(await userService.delete(userId)).toBeUndefined();
    });

    it('should call `userRepository.delete` 1 times', async () => {
      await userService.delete(userId);

      expect(userRepository.delete).toBeCalledTimes(1);
      expect(userRepository.delete).toBeCalledWith<[string]>(userId);
    });
  });

  describe('update', () => {
    let userId: string = user_id;
    let updateUserInput: UpdateUserDto;
    let userRaw: UserModel;

    beforeEach(() => {
      updateUserInput = updateUserStub();

      const { email, name } = updateUserInput;

      userRaw = userModelStub({ user_id: userId, email, name });

      jest.spyOn(userRepository, 'update').mockResolvedValue(userRaw);
    });

    it('should return promise of type `UserResponse`', async () => {
      const { name, email } = updateUserInput;
      const user = await userService.update(userId, updateUserInput);

      expect(user).toMatchObject<UserResponse>(
        userResponseMatcher({
          user_id: userId,
          name,
          email,
        }),
      );
    });

    it('should call `userService.update`', async () => {
      await userService.update(userId, updateUserInput);

      expect(userRepository.update).toBeCalledTimes(1);
      expect(userRepository.update).toBeCalledWith<[string, UpdateUserDto]>(
        userId,
        updateUserInput,
      );
    });
  });
});
