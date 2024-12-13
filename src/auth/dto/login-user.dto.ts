import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
