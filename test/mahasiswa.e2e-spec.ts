import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { LoginUserDto } from '../src/auth/dto/login-user.dto';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import {
  LoginResponse,
  RegisterResponse,
} from '../src/common/interfaces/auth-response.interface';
import { PrismaService } from '../src/common/prisma.service';
import { TestMahasiswa } from '../src/common/utils/test/mahasiswa';
import { CreateMahasiswaDto } from '../src/mahasiswa/dto/create-mahasiswa.dto';
import { createLogger, transports } from 'winston';
import { MahasiswaResponse } from '../src/common/interfaces/mahasiswa-response.interface';
import { TestUser } from '../src/common/utils/test/user';
import { UpdateMahasiswaDto } from 'src/mahasiswa/dto/update-mahasiswa.dto';
import { Role } from '@prisma/client';

describe('testing endpoint /mahasiswa', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let testMahasiswa: TestMahasiswa;
  let testUser: TestUser;

  const mockLogger = createLogger(new transports.Console());
  const mockMahasiswa: CreateMahasiswaDto = {
    NIM: 23404351,
    name: 'Jokowee',
    phone: '087849927792',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: mockLogger,
        },
      ],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    testMahasiswa = new TestMahasiswa(prismaService);
    testUser = new TestUser(prismaService);
    await testMahasiswa.create(mockMahasiswa);
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await testUser.delete(mockMahasiswa.NIM);
    await testMahasiswa.delete(mockMahasiswa.NIM);
  });

  const registerData: RegisterUserDto = {
    usernameByNIM: mockMahasiswa.NIM,
    password: '12345678',
  };
  let token: string;
  it('/auth/register', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData);
    const bodyDataResponse = response.body.data;
    const expectedDataResponse: RegisterResponse = {
      usernameByNIM: mockMahasiswa.NIM,
      name: mockMahasiswa.name,
    };

    expect(bodyDataResponse).toEqual(expectedDataResponse);
  });
  const loginData: LoginUserDto = {
    ...registerData,
  };
  it('/auth/login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);
    const bodyDataResponse = response.body.data as LoginResponse;
    token = bodyDataResponse.accessToken;
    expect(token).toBeDefined();
  });

  // testing section

  // GET
  it('should be able to get all mahasiswa', async () => {
    const response = await request(app.getHttpServer()).get('/mahasiswa');
    const bodyDataResponse = response.body.data as MahasiswaResponse[];
    const expextedResponse = await testMahasiswa.getAll();
    expect(bodyDataResponse[0]).toEqual(expextedResponse[0]);
  });

  const newMahasiswaData: CreateMahasiswaDto = {
    NIM: 432424129,
    name: 'Mechgawat',
    phone: '0823234234',
  };

  // POST
  it('should reject to create mahasiswa if role is not admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/mahasiswa')
      .send(newMahasiswaData)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  it('should be able to create mahasiswa if role is admin', async () => {
    // change role to admin
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);

    const response = await request(app.getHttpServer())
      .post('/mahasiswa')
      .send(newMahasiswaData)
      .auth(token, { type: 'bearer' });

    const bodyDataResponse = response.body.data as MahasiswaResponse;
    const expextedResponse = await testMahasiswa.getByNIM(newMahasiswaData.NIM);
    expect(bodyDataResponse).toEqual(expextedResponse);
  });

  const updateMahasiswaData: UpdateMahasiswaDto = {
    ...newMahasiswaData,
    name: 'Poean M',
  };

  it('should be able to update mahasiswa data', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/mahasiswa/${updateMahasiswaData.NIM}`)
      .send(updateMahasiswaData)
      .auth(token, { type: 'bearer' });

    const bodyDataResponse = response.body.data as MahasiswaResponse;
    const expextedResponse = await testMahasiswa.getByNIM(newMahasiswaData.NIM);
    expect(bodyDataResponse).toEqual(expextedResponse);
  });

  it('should reject to update mahasiswa data if NIM not found', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/mahasiswa/${updateMahasiswaData.NIM + 3242342}`)
      .send(updateMahasiswaData)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should reject to update mahasiswa data if role is not admin', async () => {
    // change role to user
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const response = await request(app.getHttpServer())
      .patch(`/mahasiswa/${updateMahasiswaData.NIM}`)
      .send(updateMahasiswaData)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  it('should be able to delete mahasiswa', async () => {
    // change role to admin
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const response = await request(app.getHttpServer())
      .delete(`/mahasiswa/${updateMahasiswaData.NIM}`)
      .auth(token, { type: 'bearer' });

    const bodyDataResponse = response.body.data as MahasiswaResponse;
    expect(bodyDataResponse).toBeDefined();
  });

  it('should reject to delete mahasiswa if NIM not found', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/mahasiswa/${updateMahasiswaData.NIM + 324234}`)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('should reject to delete mahasiswa if role is not admin', async () => {
    // change role to user
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const response = await request(app.getHttpServer())
      .delete(`/mahasiswa/${updateMahasiswaData.NIM}`)
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
});
