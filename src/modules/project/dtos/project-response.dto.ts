import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { formatDate } from '@utils/format-date';

export class ProjectResponseDto {
  @Expose()
  name: string;
  @Exclude()
  user_id: string;

  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  createdAt: string;

  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  updatedAt: string;
}
