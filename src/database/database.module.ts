import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@config/environment.config';
import { User } from '@modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: (dbConfig.type as 'sqlite' | 'postgres') || 'sqlite',
          database: dbConfig.database || 'db.sqlite',
          entities: [User],
          synchronize: dbConfig.synchronize ?? true,
          logging: dbConfig.logging ?? false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
