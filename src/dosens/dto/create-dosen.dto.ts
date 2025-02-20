import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDosenDto {
  @IsString()
  @MinLength(5)
  name: string;
  @IsString()
  @MinLength(5)
  matkul: string;
  @IsString()
  @MinLength(5)
  phone: string;
  @IsString()
  @MinLength(5)
  whatsapp: string | null;
}
