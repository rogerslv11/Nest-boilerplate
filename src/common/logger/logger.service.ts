import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as pino from 'pino';

@Injectable()
export class Logger implements NestLoggerService {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino.default({
      level: process.env['LOG_LEVEL'] || 'info',
      transport:
        process.env['NODE_ENV'] !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
    });
  }

  log(message: string, context?: string): void {
    this.logger.info({ context }, message);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error({ context, stack: trace }, message);
  }

  warn(message: string, context?: string): void {
    this.logger.warn({ context }, message);
  }

  debug(message: string, context?: string): void {
    this.logger.debug({ context }, message);
  }

  verbose(message: string, context?: string): void {
    this.logger.trace({ context }, message);
  }
}
