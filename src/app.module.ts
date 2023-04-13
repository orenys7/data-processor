import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import * as Joi from 'joi';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { LoggingInterceptor } from './utils/interceptors/logging.interceptor';
import { RmqModule } from './rmq/rmq.module';
import { RedisConnectorModule } from './redis/redis.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_DATA_PROCESSOR_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    RedisConnectorModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
