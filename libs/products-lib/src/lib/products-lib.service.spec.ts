import { Test, TestingModule } from '@nestjs/testing';
import { ProductsLibService } from './products-lib.service';

describe('ProductsLibService', () => {
  let service: ProductsLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsLibService],
    }).compile();

    service = module.get<ProductsLibService>(ProductsLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
