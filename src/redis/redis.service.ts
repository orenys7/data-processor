import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisConnectorService {
  private readonly logger = new Logger(RedisConnectorService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: any, ttl?: number) {
    const setVal = JSON.stringify(value);
    this.logger.log(`Setting key to redis: ${key}`);
    return this.cacheManager.set(key, setVal, ttl);
  }

  async get(key: string) {
    this.logger.log(`Getting key from redis: ${key}`);
    return this.cacheManager.get(key);
  }

  async getAll() {
    return await this.get('*');
  }

  async remove(key: string) {
    this.logger.log(`Remove key from redis: ${key}`);
    return this.cacheManager.del(key);
  }
}
