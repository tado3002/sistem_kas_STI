import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { createLogger, transports } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from '../src/app.module';
import { TestMahasiswa } from '../src/common/utils/test/mahasiswa';
import { CreateMahasiswaDto } from '../src/mahasiswa/dto/create-mahasiswa.dto';
import { TestUser } from '../src/common/utils/test/user';
import { RegisterUserDto } from '../src/auth/dto/register-user.dto';
import * as request from 'supertest';
import { CreateTransaksiDto } from '../src/transaksi/dto/create-transaksi.dto';
import { Role } from '@prisma/client';
import { TestTransaksi } from '../src/common/utils/test/transaksi';
import { UpdateTransaksiDto } from 'src/transaksi/dto/update-transaksi.dto';

describe('', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let testMahasiswa: TestMahasiswa;
  let testUser: TestUser;
  let testTransaksi: TestTransaksi;
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
    testTransaksi = new TestTransaksi(prismaService);

    await testMahasiswa.create(mockMahasiswa);
  });
  afterAll(async () => {
    await testTransaksi.delete(mockMahasiswa.NIM);
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

  it('should be able to register and login', async () => {
    // buat user
    await testUser.register(mockUser, app);
    // login dan dapatkan token
    token = await testUser.login(mockUser, app);
    // ganti role menjadi admin
    await testUser.updateRole(mockMahasiswa.NIM, 'admin');
  });

  // POST
  const createTransaksi: CreateTransaksiDto = {
    NIM_mahasiswa: mockMahasiswa.NIM,
    type: 'pemasukan',
    nominal: 30000,
    deskripsi: 'Bayar kas',
  };
  it('should be able to create transaksi', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const response = await request(app.getHttpServer())
      .post('/transaksi')
      .send(createTransaksi)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(201);
  });
  it('should reject to create transaksi if NIM is not exist', async () => {
    const response = await request(app.getHttpServer())
      .post('/transaksi')
      .send({ ...createTransaksi, NIM_mahasiswa: 1234455 })
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should reject to create transaksi if user role is not admin', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const response = await request(app.getHttpServer())
      .post('/transaksi')
      .send(createTransaksi)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  // GET
  it('should be able to find all transaksi', async () => {
    const response = await request(app.getHttpServer()).get(`/transaksi`);
    expect(response.statusCode).toBe(200);
  });
  it('should be able to find transaksi by id', async () => {
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const response = await request(app.getHttpServer()).get(
      `/transaksi/${transaksi[0].id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(transaksi[0]);
  });
  it('should reject to find transaksi if id not found', async () => {
    const response = await request(app.getHttpServer()).get(
      `/transaksi/8942347`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should be able to find transaksi by NIM', async () => {
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const response = await request(app.getHttpServer()).get(
      `/transaksi/NIM/${transaksi[0].NIM_mahasiswa}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0]).toEqual(transaksi[0]);
  });
  it('should reject to find transaksi if NIM not found', async () => {
    const response = await request(app.getHttpServer()).get(
      `/transaksi/NIM/8942347`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  // UPDATE
  const updateTransaksi: UpdateTransaksiDto = {
    nominal: 10000,
    deskripsi: 'Membayar uang kas',
  };
  it('should be able to update transaksi', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const response = await request(app.getHttpServer())
      .patch(`/transaksi/${transaksi[0].id}`)
      .send(updateTransaksi)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(200);
  });
  it('should reject to update transaksi if ID not found', async () => {
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const response = await request(app.getHttpServer())
      .patch(`/transaksi/${transaksi[0].id + 32432423}`)
      .send(updateTransaksi)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
  it('should reject to update transaksi if user role is not admin', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.user);
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    const response = await request(app.getHttpServer())
      .patch(`/transaksi/${transaksi[0].id}`)
      .send({ ...updateTransaksi, nominal: 4000 })
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  // DELETE
  it('should be able to delete transaksi', async () => {
    await testUser.updateRole(mockMahasiswa.NIM, Role.admin);
    const transaksi = await testTransaksi.getByNIM(mockMahasiswa.NIM);
    console.log(transaksi);
    const response = await request(app.getHttpServer())
      .delete(`/transaksi/${transaksi[0].id}`)
      .auth(token, { type: 'bearer' });
    expect(response.statusCode).toBe(200);
  });
});
