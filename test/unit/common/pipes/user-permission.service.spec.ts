import { checkUserAuthorization } from '@common/pipes';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { user_id } from 'test/helper/user';

describe('checkUserAuthorization', () => {
  let userId: string;
  let paramId: string;

  it('should throw ForbiddenException (403) when userId is not equal to paramId', () => {
    userId = user_id;
    paramId = '';

    const throwForbiddenException = () => {
      checkUserAuthorization(userId, paramId);
    };

    expect(throwForbiddenException).toThrow(ForbiddenException);
    expect(throwForbiddenException).toThrow(
      `You don't have the permission to proceed`,
    );
  });

  it('should return void when userId is equal to paramId', () => {
    userId = user_id;
    paramId = userId;

    expect(checkUserAuthorization(userId, paramId)).toBeUndefined();
  });
});
