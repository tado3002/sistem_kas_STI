import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DosensModule } from './dosens/dosens.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { CommonModule } from './common/common.module';
import { TransaksiModule } from './transaksi/transaksi.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    DosensModule,
    AuthModule,
    UsersModule,
    MahasiswaModule,
    CommonModule,
    TransaksiModule,
  ],
})
export class AppModule {}
