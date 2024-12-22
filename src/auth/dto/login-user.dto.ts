import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsNumber()
  usernameByNIM: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
