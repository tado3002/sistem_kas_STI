import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueriesTransaksiDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 10;
  @IsOptional()
  @IsEnum(SortOrder)
  sort: SortOrder = SortOrder.DESC;
}
