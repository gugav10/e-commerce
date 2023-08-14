import { Test, TestingModule } from '@nestjs/testing';
import { StocksLibService } from './stocks-lib.service';

describe('StocksLibService', () => {
  let service: StocksLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksLibService],
    }).compile();

    service = module.get<StocksLibService>(StocksLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
