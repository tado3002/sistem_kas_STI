import { Module } from '@nestjs/common';
import { DosensService } from './dosens.service';
import { DosensController } from './dosens.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DosensController],
  providers: [DosensService, PrismaService],
})
export class DosensModule {}
