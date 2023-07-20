import { Expose, Transform, Type } from 'class-transformer';
import { formatDate } from 'src/common/utils/format-date';

export class ProjectResponseDto {
  @Expose()
  name: string;
  @Expose()
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
