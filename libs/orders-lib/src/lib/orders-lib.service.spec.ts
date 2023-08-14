import { Test, TestingModule } from '@nestjs/testing';
import { OrdersLibService } from './orders-lib.service';

describe('OrdersLibService', () => {
  let service: OrdersLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersLibService],
    }).compile();

    service = module.get<OrdersLibService>(OrdersLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
