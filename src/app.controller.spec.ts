import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqContext } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from './rmq/rmq.module';

describe('AppController', () => {
  let appController: AppController;

  const channel = {
    ack: jest.fn(),
    nack: jest.fn(),
    reject: jest.fn(),
  };

  const rmqContext = {
    getChannelRef: jest.fn().mockReturnValue(channel),
    getPattern: () => 'testPattern',
    getMessage: () => ({ content: 'testMessageContent' }),
    ack: jest.fn(),
    nack: jest.fn(),
    reject: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(),
            RABBIT_MQ_DATA_PROCESSOR_QUEUE: Joi.string().required(),
          }),
        }),
        RmqModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const res = await appController.handleQueryData(
        {},
        rmqContext as unknown as RmqContext,
      );
      expect(res).toBe('Hello World!');
    });
  });
});
