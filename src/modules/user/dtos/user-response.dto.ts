import { formatDate } from '@utils/format-date';
import { Expose, Transform, Type } from 'class-transformer';

export class UserResponse {
  @Expose()
  user_id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  createdAt: string;
  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  updatedAt: string;
}
