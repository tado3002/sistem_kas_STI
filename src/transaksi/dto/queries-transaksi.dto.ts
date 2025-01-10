import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueriesTransaksiDto {
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
