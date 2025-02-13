import { IsOptional, IsString, MinLength } from 'class-validator';

export class QueriesMahasiswaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
}
