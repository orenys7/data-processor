import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  fetchData(data: any) {
    this.logger.log('fetchData...');
    return 'Hello World!';
  }
}
