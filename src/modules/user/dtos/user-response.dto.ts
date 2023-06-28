import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  user_id: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  name: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
