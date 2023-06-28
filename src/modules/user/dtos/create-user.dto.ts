import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @Length(3, 254)
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @Length(3, 254)
  name: string;
}
