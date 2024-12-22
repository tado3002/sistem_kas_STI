import { Module } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { TransaksiController } from './transaksi.controller';

@Module({
  controllers: [TransaksiController],
  providers: [TransaksiService],
})
export class TransaksiModule {}
