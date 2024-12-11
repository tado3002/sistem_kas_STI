import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { DosensModule } from './dosens/dosens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
  imports: [DosensModule, AuthModule, UsersModule, MahasiswaModule],
})
export class AppModule {}
