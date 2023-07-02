import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ZodError, z } from 'zod';

@Injectable({ scope: Scope.REQUEST })
export class UserPermissionPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  async transform(metadata: ArgumentMetadata) {
    const { id: paramId, email } = this.req.params;
    const { user_id } = this.req.user;

    try {
      const schema = z.object({
        user_id: z.string().refine((value) => {
          value === paramId;
        }),
      });

      schema.parse({ user_id: user_id });

      return metadata;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          error: HttpStatus.BAD_REQUEST,
          message: `You don't have permission to continue`,
        });
      }
    }
  }
}
