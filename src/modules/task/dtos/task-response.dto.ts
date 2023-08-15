import { formatDate } from '@utils/date-formatting';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class TaskResponseDto {
  @Expose()
  task_id: string;
  @Expose()
  name: string;
  @Expose()
  description?: string;
  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  expiration_date: string;
  @Expose()
  status: boolean;
  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  createdAt: string;
  @Type(() => Date)
  @Expose()
  @Transform(({ value }) => formatDate(value), { toClassOnly: true })
  updatedAt: string;
  @Exclude()
  user_id?: string;
  @Exclude()
  project_id?: string;
}
