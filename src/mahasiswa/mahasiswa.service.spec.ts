import { Test, TestingModule } from '@nestjs/testing';
import { MahasiswaService } from './mahasiswa.service';

describe('MahasiswaService', () => {
  let service: MahasiswaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MahasiswaService],
    }).compile();

    service = module.get<MahasiswaService>(MahasiswaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
