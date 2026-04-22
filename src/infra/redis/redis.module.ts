import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Logger } from '@common/logger/logger.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisService, Logger],
  exports: [RedisService, Logger],
})
export class RedisModule {}
