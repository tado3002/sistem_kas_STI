import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { DosensModule } from './dosens/dosens.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
  imports: [DosensModule],
})
export class AppModule {}
