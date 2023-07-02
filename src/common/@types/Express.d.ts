import type { Request } from 'express';
import { UserModel } from 'src/models/user.model';

declare module 'express' {
  export interface Request {
    user: UserModel;
  }
}
