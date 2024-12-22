import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { createLogger, transports } from 'winston';
import { AppModule } from '../src/app.module';
import { CreateMahasiswaDto } from 'src/mahasiswa/dto/create-mahasiswa.dto';
import { TestUser } from '../src/common/utils/test/user';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import * as request from 'supertest';
import { CreateDosenDto } from '../src/dosens/dto/create-dosen.dto';
import { TestMahasiswa } from '../src/common/utils/test/mahasiswa';
import { TestDosen } from '../src/common/utils/test/dosen';
import { Role } from '@prisma/client';
import { UpdateDosenDto } from '../src/dosens/dto/update-dosen.dto';
import { DosenResponse } from '../src/common/interfaces/dosen-response.interface';

describe('', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let testUser: TestUser;
  let testMahasiswa: TestMahasiswa;
  let testDosen: TestDosen;
  let token: string;

  const logger = createLogger(new transports.Console());
  const mockMahasiswa: CreateMahasiswaDto = {
    NIM: 24121024,
    name: 'muhammad murtadlo',
    phone: '081330329363',
  };
  const mockUser: RegisterUserDto = {
    usernameByNIM: mockMahasiswa.NIM,
    password: '1234567',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: logger,
        },
      ],
    }).compile();
    prismaService = module.get(PrismaService);
    testMahasiswa = new TestMahasiswa(prismaService);
    testUser = new TestUser(prismaService);
    testDosen = new TestDosen(prismaService);

    // buat mahasiswa
    await testMahasiswa.create(mockMahasiswa);
  });

  afterAll(async () => {
    await testUser.delete(mockMahasiswa.NIM);
    await testMahasiswa.delete(mockMahasiswa.NIM);
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const newDosen: CreateDosenDto = {
    name: 'Pak Gema',
    matkul: 'Algopro',
    phone: '0823348322',
    whatsapp: 'sdfsgsgsgsa.me',
  };
  it('should be able to register and login', async () => {
    // buat user
    await testUser.register(mockUser, app);
    // login dan dapatkan token
    token = await testUser.login(mockUser, app);
    // ganti role menjadi admin
    await testUser.updateRole(mockMahasiswa.NIM, 'admin');
  });

  // POST
  it('should be able to create dosen', async () => {
    const response = await request(app.getHttpServer())
      .post('/dosens')
      .send(newDosen)
      .auth(token, { type: 'bearer' });

    const dataResponse = response.body.data;
    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(dataResponse).toBeDefined();
  });
  it('should reject to create dosen if dosen is exist', async () => {
    const response = await request(app.getHttpServer())
      .post('/dosens')
      .send(newDosen)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
  });
  it('should reject to create dosen if users role is not admin', async () => {
    // change role to user
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const response = await request(app.getHttpServer())
      .post('/dosens')
      .send(newDosen)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  // GET
  it('should be able to get all dosen data', async () => {
    const response = await request(app.getHttpServer()).get('/dosens');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });
  it('should be able to get dosen data by id', async () => {
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer()).get(
      `/dosens/${dosen.id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(dosen);
  });
  it('should reject to get dosen data if id not found', async () => {
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer()).get(
      `/dosens/${dosen.id + 4000}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  // UPDATE
  const updateDosen: UpdateDosenDto = {
    name: 'Pak Gemma',
    phone: '082146796695',
  };
  it('should be able to update dosen data', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .patch(`/dosens/${dosen.id}`)
      .send(updateDosen)
      .auth(token, { type: 'bearer' });
    const expectedResponse: DosenResponse = {
      ...dosen,
      ...updateDosen,
    };
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expectedResponse);
  });
  it('should reject to update dosen data if id not found', async () => {
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .patch(`/dosens/${dosen.id + 1000}`)
      .send(updateDosen)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should reject to update dosen data if user role is not admin', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .patch(`/dosens/${dosen.id}`)
      .send(updateDosen)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  // DELETE
  it('should reject to delete dosen if dosen is not exist', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .delete(`/dosens/${dosen.id + 3223}`)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should reject to delete dosen if user role is not admin', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .delete(`/dosens/${dosen.id}`)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it('should be able to delete dosen', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const dosen = await testDosen.getByMatkul(newDosen.matkul);
    const response = await request(app.getHttpServer())
      .delete(`/dosens/${dosen.id}`)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.OK);
  });
});
