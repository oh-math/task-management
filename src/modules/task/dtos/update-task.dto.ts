import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 254)
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsBoolean()
  @IsOptional()
  status?: boolean
  @IsString()
  @IsOptional()
  project_id?: string;
}
