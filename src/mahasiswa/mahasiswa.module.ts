import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';

@Module({
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
})
export class MahasiswaModule {}
