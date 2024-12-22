import { Test, TestingModule } from '@nestjs/testing';
import { DosensController } from './dosens.controller';
import { DosensService } from './dosens.service';
import { PrismaService } from 'src/common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createLogger, transports } from 'winston';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { TestDosen } from 'src/common/utils/test/dosen';
import { UpdateDosenDto } from './dto/update-dosen.dto';

describe('DosensController', () => {
  let controller: DosensController;
  let prismaService: PrismaService;
  let testDosen: TestDosen;

  const mockLoggger = createLogger(new transports.Console());
  const mockDosen: CreateDosenDto = {
    name: 'tado',
    phone: '082157894497',
    matkul: 'Fisika Nuklir',
    whatsapp: 'youtube.com',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLoggger },
      ],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    testDosen = new TestDosen(prismaService);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosensController],
      providers: [
        DosensService,
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLoggger },
      ],
    }).compile();

    controller = module.get<DosensController>(DosensController);
  });

  // create dosen
  it('should be able to create data dosen', async () => {
    const result = await controller.create(mockDosen);
    const dosen = await testDosen.getByMatkul(mockDosen.matkul);
    expect(result.data).toEqual({ ...mockDosen, id: dosen.id });
  });

  // get
  it('should be able to get all data dosen', async () => {
    const result = await controller.findAll();
    expect(result.data).toBeDefined();
  });
  it('should be able to get data dosen by ID', async () => {
    const dosen = await testDosen.getByMatkul(mockDosen.matkul);
    const result = await controller.findOne(dosen.id);
    expect(result.data).toEqual(dosen);
  });

  // update
  it('should be able to update data dosen', async () => {
    const dosen = await testDosen.getByMatkul(mockDosen.matkul);
    const updateDataDosen: UpdateDosenDto = {
      name: 'Mantap cuy',
      phone: '08321182888',
    };
    const result = await controller.update(dosen.id, updateDataDosen);
    expect(result.data).toEqual({ ...dosen, ...updateDataDosen });
  });

  // delete
  it('should be able to delete data dosen by ID', async () => {
    const dosen = await testDosen.getByMatkul(mockDosen.matkul);
    const result = await controller.remove(dosen.id);
    expect(result.data).toEqual(dosen);
  });
});
