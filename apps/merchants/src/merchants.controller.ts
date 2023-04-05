import { Controller, Get } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller()
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  getHello(): string {
    return this.merchantsService.getHello();
  }
}
