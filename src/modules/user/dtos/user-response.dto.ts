import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { formatDate } from 'src/common/utils/format-date';

export class UserResponse {
  @Expose()
  user_id: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  name: string;

  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  createdAt: string;
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  updatedAt: string;
}
