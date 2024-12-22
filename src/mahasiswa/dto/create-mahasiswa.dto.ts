import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateMahasiswaDto {
  @IsNotEmpty()
  @IsNumber()
  NIM: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  phone: string;
}
