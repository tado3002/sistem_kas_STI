import { Prisma, PrismaClient } from '@prisma/client';
import { AppLogger } from './logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaLoggerMiddleware {
  constructor(private readonly logger: AppLogger) {}
  applyMiddleware(prisma: PrismaClient) {
    prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      this.logger.log(
        `[PRISMA] Executed ${params.model}.${params.action} in ${after - before}ms`,
        'PrismaMiddleware',
      );
      return result;
    });
  }
}
