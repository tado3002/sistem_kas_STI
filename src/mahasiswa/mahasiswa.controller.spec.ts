import { Test, TestingModule } from '@nestjs/testing';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';
import { Mahasiswa } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { createLogger, transports } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { HttpStatus } from '@nestjs/common';

describe('MahasiswaController', () => {
  let prismaService: PrismaService;
  let controller: MahasiswaController;

  const mockLogger = createLogger({
    transports: [new transports.Console()],
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MahasiswaController],
      providers: [
        MahasiswaService,
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    controller = module.get<MahasiswaController>(MahasiswaController);
  });

  // testing sesion

  const mockMahasiswa: Mahasiswa = {
    NIM: 24121024,
    name: 'muhammad murtadlo',
    phone: '081330329363',
  };

  // create
  it('should can create new mahasiswa', async () => {
    const newMahasiswa = await controller.create(mockMahasiswa);
    expect(newMahasiswa.data).toEqual(mockMahasiswa);
  });
  it('should throw conflict error if NIM was created', async () => {
    try {
      await controller.create(mockMahasiswa);
    } catch (error) {
      // status 409 karena NIM mahasiswa sudah ada
      expect(error.status).toBe(HttpStatus.CONFLICT);
    }
  });

  // get
  it('should can return all mahasiswa', async () => {
    const mahasiswa = await controller.findAll();
    expect(mahasiswa.data).toBeDefined();
  });
  it('should can return mahasiswa by NIM', async () => {
    const mahasiswa = await controller.findOne(mockMahasiswa.NIM);
    expect(mahasiswa.data).toEqual(mockMahasiswa);
  });
  it('should throw not found error if NIM is not found', async () => {
    try {
      await controller.findOne(mockMahasiswa.NIM + 90);
    } catch (error) {
      // status 404 karena NIM mahasiswa sudah ada
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  // update
  const updateDataMahasiswa: UpdateMahasiswaDto = {
    name: 'Mohammad Arip',
    phone: '02146796695',
  };
  it('should can update mahasiswa by NIM', async () => {
    const updatedMahasiswa = await controller.update(
      mockMahasiswa.NIM,
      updateDataMahasiswa,
    );
    expect(updatedMahasiswa.data).toEqual({
      ...mockMahasiswa,
      ...updateDataMahasiswa,
    });
  });
  it('should throw not found error if NIM is not found', async () => {
    try {
      await controller.update(mockMahasiswa.NIM + 90, updateDataMahasiswa);
    } catch (error) {
      // status 404 karena NIM mahasiswa sudah ada
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  // remove
  it('should can delete mahasiswa by NIM', async () => {
    const mahasiswa = await controller.remove(mockMahasiswa.NIM);
    expect(mahasiswa.data).toEqual({
      ...mockMahasiswa,
      ...updateDataMahasiswa,
    });
  });
  it('should throw not found error if NIM is not found', async () => {
    try {
      await controller.remove(mockMahasiswa.NIM + 90);
    } catch (error) {
      // status 404 karena NIM mahasiswa sudah ada
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
