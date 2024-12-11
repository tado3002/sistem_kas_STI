import { Test, TestingModule } from '@nestjs/testing';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';

describe('MahasiswaController', () => {
  let controller: MahasiswaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MahasiswaController],
      providers: [MahasiswaService],
    }).compile();

    controller = module.get<MahasiswaController>(MahasiswaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
