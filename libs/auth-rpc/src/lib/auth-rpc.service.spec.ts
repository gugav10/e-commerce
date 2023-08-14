import { Test, TestingModule } from '@nestjs/testing';
import { AuthRpcService } from './auth-rpc.service';

describe('AuthRpcService', () => {
  let service: AuthRpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRpcService],
    }).compile();

    service = module.get<AuthRpcService>(AuthRpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
