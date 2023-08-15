import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 254)
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  user_id?: string;
  @IsString()
  @IsOptional()
  project_id?: string;
}
