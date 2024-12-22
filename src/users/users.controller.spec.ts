import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createLogger, transports } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Mahasiswa } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from '../common/interfaces/user-response.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let prismaService: PrismaService;

  const mockLogger = createLogger(new transports.Console());
  const mockMahasiswa: Mahasiswa = {
    NIM: 24121024,
    name: 'muhammad murtadlo',
    phone: '081330329363',
  };
  const createUserData: CreateUserDto = {
    usernameByNIM: mockMahasiswa.NIM,
    password: '12345678',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.mahasiswa.create({ data: mockMahasiswa });
    await prismaService.user.create({
      data: { ...createUserData, name: mockMahasiswa.name },
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockLogger,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  afterAll(async () => {
    await prismaService.mahasiswa.delete({ where: { NIM: mockMahasiswa.NIM } });
  });

  // update
  const updateUserData: UpdateUserDto = {
    password: 'iniadalahsandi',
  };
  const expectedResult: UserResponse = {
    usernameByNIM: mockMahasiswa.NIM,
    name: mockMahasiswa.name,
    role: 'user',
  };
  it('should be able to create user', async () => {
    const result = await controller.update(mockMahasiswa.NIM, updateUserData);
    expect(result.data).toEqual(expectedResult);
  });

  // get
  it('should return all user', async () => {
    const result = await controller.findAll();
    expect(result.data).toBeDefined();
  });

  // delete
  it('should be able to delete user', async () => {
    const result = await controller.remove(mockMahasiswa.NIM);
    const expectedResult: UserResponse = {
      usernameByNIM: mockMahasiswa.NIM,
      name: mockMahasiswa.name,
      role: 'user',
    };
    expect(result.data).toEqual(expectedResult);
  });
});
