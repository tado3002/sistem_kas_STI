import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MahasiswaController],
  providers: [MahasiswaService, PrismaService],
})
export class MahasiswaModule {}
