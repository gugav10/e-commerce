import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseStocksService } from './warehouse-stocks.service';

describe('WarehouseStocksService', () => {
  let service: WarehouseStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseStocksService],
    }).compile();

    service = module.get<WarehouseStocksService>(WarehouseStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
