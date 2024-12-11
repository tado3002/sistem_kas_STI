import { Module } from '@nestjs/common';
import { DosensService } from './dosens.service';
import { DosensController } from './dosens.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DosensController],
  providers: [DosensService, PrismaService],
})
export class DosensModule {}
