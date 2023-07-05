import { Request } from 'express';
import { UserModel } from 'src/models/user.model';

export interface UserModelRequest extends Request {
  user: UserModel;
}
