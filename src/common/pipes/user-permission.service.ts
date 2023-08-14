import { ForbiddenException, HttpStatus } from '@nestjs/common';

export function checkUserAuthorization(userId: string, paramId: string) {
  if (userId !== paramId) {
    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      message: `You don't have the permission to proceed`,
    });
  }
}
