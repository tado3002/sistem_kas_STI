import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  dosenId: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  deadline: Date;
}
