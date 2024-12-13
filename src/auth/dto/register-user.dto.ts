import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;
}
