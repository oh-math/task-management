import {
  ArgumentMetadata,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
  Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PayloadJWTRequest } from '../interfaces';

@Injectable({ scope: Scope.REQUEST })
export class UserPermissionPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly req: PayloadJWTRequest) {}

  async transform(metadata: ArgumentMetadata) {
    const { id: paramId } = this.req.params;
    const { sub: userId } = this.req.user;

    if (userId !== paramId) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: `You don't have the permission to proceed`,
      });
    }

    return metadata;
  }
}
