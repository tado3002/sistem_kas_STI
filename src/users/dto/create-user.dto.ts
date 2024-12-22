import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  usernameByNIM!: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password!: string;
}
