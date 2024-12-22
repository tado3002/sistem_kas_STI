import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaksiDto } from './create-transaksi.dto';

export class UpdateTransaksiDto extends PartialType(CreateTransaksiDto) {}
