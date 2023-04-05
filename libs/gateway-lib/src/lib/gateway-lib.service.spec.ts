import { Test, TestingModule } from '@nestjs/testing';
import { GatewayLibService } from './gateway-lib.service';

describe('GatewayLibService', () => {
  let service: GatewayLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayLibService],
    }).compile();

    service = module.get<GatewayLibService>(GatewayLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
