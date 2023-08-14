import { Test } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@user/dtos';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import {
  createUserStub,
  updateUserStub,
  userResponseMatcher,
  userResponseStub,
  user_id,
} from 'test/helper/user';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByIdOrEmail: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = new UserController(userService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  beforeEach(() => jest.clearAllMocks());

  
  describe('create', () => {
    let createUserInput: CreateUserDto;
    let userResponse: UserResponse;

    beforeEach(() => {
      createUserInput = createUserStub();
      const { email, name } = createUserInput;

      userResponse = userResponseStub({
        email,
        name,
      });

      jest.spyOn(userService, 'create').mockResolvedValue(userResponse);
    });

    it('should return promise of type `UserResponse`', async () => {
      const user = await userController.create(createUserInput);
      const { email, name } = createUserInput;

      expect(user).toMatchObject<UserResponse>(
        userResponseMatcher({ email, name }),
      );
    });

    it('should call `userService.create` 1 times', async () => {
      await userController.create(createUserInput);

      expect(userService.create).toBeCalledTimes(1);
      expect(userService.create).toBeCalledWith<[CreateUserDto]>(
        createUserInput,
      );
    });
  });

  describe('findAll', () => {
    let usersResponse: UserResponse[];

    beforeEach(() => {
      usersResponse = Array(userResponseStub());

      jest.spyOn(userService, 'findAll').mockResolvedValue(usersResponse);
    });

    it('should return promise of type `UserResponse[]`', async () => {
      const users = await userController.findAll();

      expect(users).toMatchObject<UserResponse[]>(usersResponse);
    });

    it('should call `userService.findAll` 1 times', async () => {
      await userController.findAll();

      expect(userService.findAll).toBeCalledTimes(1);
    });
  });

  describe('findByIdOrEmail', () => {
    let userResponse: UserResponse;
    let userId = user_id;

    beforeEach(() => {
      userResponse = userResponseStub({ user_id: userId });

      jest
        .spyOn(userService, 'findByIdOrEmail')
        .mockResolvedValue(userResponse);
    });

    it('should return promise of type `UserResponse`', async () => {
      const user = await userController.findByIdOrEmail(userId);

      expect(user).toMatchObject<UserResponse>(
        userResponseMatcher({
          user_id: userId,
        }),
      );
    });

    it('should call `userService.findByIdOrEmail` 1 times', async () => {
      await userController.findByIdOrEmail(userId);

      expect(userService.findByIdOrEmail).toBeCalledTimes(1);
      expect(userService.findByIdOrEmail).toBeCalledWith<[string]>(userId);
    });
  });

  describe('delete', () => {
    const userId = user_id;

    it('should return a void promise', async () => {
      expect(await userController.delete(userId)).toBeUndefined();
    });

    it('should call `userService.delete` 1 times', async () => {
      await userController.delete(userId);

      expect(userService.delete).toBeCalledTimes(1);
      expect(userService.delete).toBeCalledWith<[string]>(userId);
    });
  });

  describe('update', () => {
    let userResponse: UserResponse;
    let updateUserInput: UpdateUserDto;
    let userId = user_id;

    beforeEach(() => {
      updateUserInput = updateUserStub();
      const { email, name } = updateUserInput;

      userResponse = userResponseStub({
        user_id: userId,
        email,
        name,
      });

      jest.spyOn(userService, 'update').mockResolvedValue(userResponse);
    });

    it('should return promise of type `UserResponse`', async () => {
      const { email, name } = updateUserInput;
      const user = await userController.update(updateUserInput, userId);

      expect(user).toMatchObject<UserResponse>(
        userResponseMatcher({
          user_id: userId,
          email,
          name,
        }),
      );
    });

    it('should call `userService.update` 1 times', async () => {
      await userController.update(updateUserInput, userId);

      expect(userService.update).toBeCalledTimes(1);
      expect(userService.update).toBeCalledWith<[string, UpdateUserDto]>(
        userId,
        updateUserInput,
      );
    });
  });
});
