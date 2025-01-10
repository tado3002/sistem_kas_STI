import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransaksiDto {
  @IsNumber()
  @IsNotEmpty()
  NIM_mahasiswa: number;
  @IsNumber()
  @IsNotEmpty()
  nominal: number;
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
  @IsString()
  @IsNotEmpty()
  deskripsi: string;
}
