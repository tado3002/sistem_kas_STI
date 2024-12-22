import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class RegisterUserDto {
  @IsNotEmpty()
  @IsNumber()
  usernameByNIM: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
