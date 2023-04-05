import { Test, TestingModule } from '@nestjs/testing';
import { AuthLibService } from './auth-lib.service';

describe('AuthLibService', () => {
  let service: AuthLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLibService],
    }).compile();

    service = module.get<AuthLibService>(AuthLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
