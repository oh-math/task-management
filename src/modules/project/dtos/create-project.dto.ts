import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 254)
  name: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
