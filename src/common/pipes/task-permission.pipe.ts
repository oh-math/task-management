import {
  ArgumentMetadata,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TaskService } from 'src/modules/task/task.service';
import { PayloadJWTRequest } from '../interfaces/payload-jwt-request.interface';
import { checkTaskCreatorAuthorization } from './task-permission.service';

@Injectable({ scope: Scope.REQUEST })
export class TaskPermissionPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req: PayloadJWTRequest,
    private readonly taskService: TaskService,
  ) {}
  async transform(metadata: ArgumentMetadata) {
    const { id: taskId } = this.req.params;
    const { sub: userId } = this.req.user;

    await checkTaskCreatorAuthorization(this.taskService, taskId, userId);

    return metadata;
  }
}
