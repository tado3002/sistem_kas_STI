import { Type } from 'class-transformer';
import { IsDate, IsPositive, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsPositive()
  dosenId: number;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @Type(() => Date)
  @IsDate()
  deadline: Date;
}
