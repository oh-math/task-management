import { formatDate } from '@utils/date-formatting';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class UserResponse {
  @Expose()
  user_id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Exclude()
  password?: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  createdAt: string;
  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  updatedAt: string;
}
