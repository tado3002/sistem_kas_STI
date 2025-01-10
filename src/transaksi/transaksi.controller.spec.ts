import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiController } from './transaksi.controller';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { PrismaService } from '../common/prisma.service';
import { createLogger, transports } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Mahasiswa } from '@prisma/client';
import { TestTransaksi } from '../common/utils/test/transaksi';
import { QueriesTransaksiDto } from './dto/queries-transaksi.dto';

describe('TransaksiController', () => {
  let prismaService: PrismaService;
  let controller: TransaksiController;
  let testTransaksi: TestTransaksi;

  const mockLogger = createLogger({
    transports: [new transports.Console()],
  });
  const mockMahasiswa: Mahasiswa = {
    NIM: 24121024,
    name: 'muhammad murtadlo',
    phone: '081330329363',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.mahasiswa.create({ data: { ...mockMahasiswa } });
    testTransaksi = new TestTransaksi(prismaService);
  });
  afterAll(async () => {
    //await prismaService.transaksi.deleteMany({
    //  where: { NIM_mahasiswa: mockMahasiswa.NIM },
    //});
    //await prismaService.mahasiswa.delete({ where: { NIM: mockMahasiswa.NIM } });

    await prismaService.$disconnect();
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaksiController],
      providers: [
        TransaksiService,
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    controller = module.get<TransaksiController>(TransaksiController);
  });

  // testing sesion
  const createDataTransaction: CreateTransaksiDto = {
    NIM_mahasiswa: mockMahasiswa.NIM,
    nominal: 20000,
    type: 'pemasukan',
    deskripsi: 'bayar kas',
  };
  enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
  }

  // create
  it('should be success to create', async () => {
    const result = await controller.create(createDataTransaction);
    expect(result.data).toBeDefined();
  });

  // get
  it('should be able to find transaksi id', async () => {
    const getTransaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const result = await controller.findOne(getTransaksi[0].id);
    expect(result.data).toEqual(getTransaksi);
  });

  it('should be able to find all transaksi', async () => {
    const getAllTransaksi = await testTransaksi.findAll();
    const query: QueriesTransaksiDto = {
      page: 1,
      size: 10,
      sort: SortOrder.DESC,
    };
    // perulangan input data > 10 kali
    for (let i = 0; i < 30; i++) {
      const createData: CreateTransaksiDto = {
        ...createDataTransaction,
        nominal: createDataTransaction.nominal + i,
      };
      await controller.create(createData);
    }
    const result = await controller.findAllPaginate(query);
    console.log(result);
    expect(result.data).toEqual(getAllTransaksi);
  });

  //it('should be able to find transaksi NIM', async () => {
  //  const getTransaksi = (await testTransaksi.getByNIM(
  //    mockMahasiswa.NIM,
  //    prismaService,
  //  )) as TransaksiResponse;
  //  const result = await controller.findByNIM(mockMahasiswa.NIM);
  //  expect(result.data[0]).toEqual(getTransaksi);
  //});
  //
  //// update
  //const updatedDataTransaction = {
  //  nominal: 30000,
  //  type: 'pengeluaran',
  //};
  //
  //it('should be able to update transaksi', async () => {
  //  const transaksi = await testTransaksi.getByNIM(
  //    mockMahasiswa.NIM,
  //    prismaService,
  //  );
  //  const result = await controller.update(
  //    transaksi.id,
  //    updatedDataTransaction,
  //  );
  //  const expectedResult = {
  //    ...transaksi,
  //    ...updatedDataTransaction,
  //  };
  //  expect(result.data).toEqual(expectedResult);
  //});

  // delete
  it('should be able to delete transaksi', async () => {
    const getTransaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const result = await controller.remove(getTransaksi[0].id);
    expect(result.data).toEqual(getTransaksi);
  });
});
