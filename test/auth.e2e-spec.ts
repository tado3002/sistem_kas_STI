import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/common/prisma.service';
import { createLogger, transports } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateMahasiswaDto } from '../src/mahasiswa/dto/create-mahasiswa.dto';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import {
  LoginResponse,
  RegisterResponse,
} from 'src/common/interfaces/auth-response.interface';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

describe('testing', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  const mockLogger = createLogger(new transports.Console());
  const mockMahasiswa: CreateMahasiswaDto = {
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
  });
  afterAll(async () => {
    await prismaService.user.delete({
      where: { usernameByNIM: mockMahasiswa.NIM },
    });
    await prismaService.mahasiswa.delete({ where: { NIM: mockMahasiswa.NIM } });
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
    const bodyResponse = response.body as ApiResponse<RegisterResponse>;
    const expectedDataResponse: RegisterResponse = {
      usernameByNIM: registerData.usernameByNIM,
      name: mockMahasiswa.name,
    };

    expect(bodyResponse.data).toEqual(expectedDataResponse);
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
});
