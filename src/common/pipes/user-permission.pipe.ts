import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PayloadJWTRequest } from '../interfaces';
import { checkUserAuthorization } from './user-permission.service';

@Injectable({ scope: Scope.REQUEST })
export class UserPermissionPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly req: PayloadJWTRequest) {}

  async transform(metadata: ArgumentMetadata) {
    const { id: paramId } = this.req.params;
    const { sub: userId } = this.req.user;

    checkUserAuthorization(userId, paramId);

    return metadata;
  }
}
