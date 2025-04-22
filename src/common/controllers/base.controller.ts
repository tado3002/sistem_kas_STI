import { InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from '../logger/logger.service';

export abstract class BaseController {
  constructor(protected readonly logger: AppLogger) {}

  protected async handle<T>(
    action: () => Promise<T>,
    context: string,
  ): Promise<T> {
    try {
      return await action();
    } catch (error) {
      this.logger.error(
        `Failed to ${context}`,
        error.stack,
        this.constructor.name,
      );

      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException('internal server error!');
      }

      throw error;
    }
  }
}
