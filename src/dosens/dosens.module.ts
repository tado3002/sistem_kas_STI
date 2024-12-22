import { Module } from '@nestjs/common';
import { DosensService } from './dosens.service';
import { DosensController } from './dosens.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DosensController],
  providers: [DosensService],
})
export class DosensModule {}
