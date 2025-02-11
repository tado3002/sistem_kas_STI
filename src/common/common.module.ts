import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppLogger } from './logger/logger.service';
import { PrismaLoggerMiddleware } from './logger/prisma-logger.middleware';

@Global()
@Module({
  providers: [PrismaService, AppLogger, PrismaLoggerMiddleware],
  exports: [PrismaService, AppLogger],
})
export class CommonModule {}
