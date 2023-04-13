import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RmqService } from './rmq/rmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('query_data')
  async handleQueryData(@Payload() data: any, @Ctx() context: RmqContext) {
    const res = this.appService.fetchData(data);
    if (res) {
      this.rmqService.ack(context);
      return res;
    }
  }
}
