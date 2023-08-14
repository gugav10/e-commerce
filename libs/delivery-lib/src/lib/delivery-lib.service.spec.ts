import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryLibService } from './delivery-lib.service';

describe('DeliveryLibService', () => {
  let service: DeliveryLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryLibService],
    }).compile();

    service = module.get<DeliveryLibService>(DeliveryLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
