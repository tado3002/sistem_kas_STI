import { Test, TestingModule } from '@nestjs/testing';
import { DosensService } from './dosens.service';

describe('DosensService', () => {
  let service: DosensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosensService],
    }).compile();

    service = module.get<DosensService>(DosensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
