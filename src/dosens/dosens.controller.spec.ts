import { Test, TestingModule } from '@nestjs/testing';
import { DosensController } from './dosens.controller';
import { DosensService } from './dosens.service';

describe('DosensController', () => {
  let controller: DosensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosensController],
      providers: [DosensService],
    }).compile();

    controller = module.get<DosensController>(DosensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
