import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name!: string;
}
