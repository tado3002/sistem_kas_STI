import { PartialType } from '@nestjs/mapped-types';
import { CreateDosenDto } from './create-dosen.dto';

export class UpdateDosenDto extends PartialType(CreateDosenDto) {
  name?: string;
  phone?: string;
  whatsapp?: string;
  matkul?: string;
}
