import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { validate } from '@config/environment.config';
import { Logger } from '@common/logger/logger.service';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from '@infra/redis/redis.module';
import { QueueModule } from '@infra/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    RedisModule,
    QueueModule,
  
  ],
  providers: [Logger],
})
export class AppModule {}
