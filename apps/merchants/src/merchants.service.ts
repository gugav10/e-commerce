import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantsService {
  getHello(): string {
    return 'Hello World!';
  }
}
