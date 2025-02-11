import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AppLogger } from './logger/logger.service';
import { PrismaLoggerMiddleware } from './logger/prisma-logger.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly logger: AppLogger,
    private readonly prismaLogger: PrismaLoggerMiddleware,
  ) {
    super({
      log: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'query' },
      ],
    });
    // Terapkan middleware logging
    this.prismaLogger.applyMiddleware(this);

    // Event logging untuk Prisma
    this.$on('query', (e) => {
      this.logger.debug(
        `[PRISMA QUERY] ${e.query} - Params: ${e.params} - ${e.duration}ms`,
      );
    });

    this.$on('info', (e) => {
      this.logger.log(`[PRISMA INFO] ${e.message}`, 'PrismaService');
    });

    this.$on('warn', (e) => {
      this.logger.warn(`[PRISMA WARN] ${e.message}`, 'PrismaService');
    });

    this.$on('error', (e) => {
      this.logger.error(
        `[PRISMA ERROR] ${e.message}`,
        e.target,
        'PrismaService',
      );
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to Prisma database', 'PrismaService');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from Prisma database', 'PrismaService');
  }
}
