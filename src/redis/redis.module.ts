import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisConnectorService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: false,

      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          ttl: 5000,
        }),
        socket: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
  ],
  providers: [RedisConnectorService],
  exports: [RedisConnectorService],
})
export class RedisConnectorModule {}
