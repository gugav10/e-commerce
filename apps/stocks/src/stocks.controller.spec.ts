import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

describe('StockController', () => {
  let stockController: StocksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService],
    }).compile();

    stockController = app.get<StocksController>(StocksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stockController.getHello()).toBe('Hello World!');
    });
  });
});
