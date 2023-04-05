import { Controller, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  getHello(): string {
    return this.deliveryService.getHello();
  }
}
