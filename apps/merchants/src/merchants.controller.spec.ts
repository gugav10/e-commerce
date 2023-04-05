import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

describe('MerchantsController', () => {
  let merchantsController: MerchantsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MerchantsController],
      providers: [MerchantsService],
    }).compile();

    merchantsController = app.get<MerchantsController>(MerchantsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(merchantsController.getHello()).toBe('Hello World!');
    });
  });
});
