import { Request } from 'express';
import { PayloadJWT } from './payload-jwt.interface';

export interface PayloadJWTRequest extends Request {
  user: PayloadJWT;
}
