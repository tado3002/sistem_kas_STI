import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { PrismaService } from '../common/prisma.service';
import { QueriesMahasiswaDto } from './dto/queries-mahasiswa.dto';
import { toApiResponse } from 'src/common/interfaces/response.interface';
import { MahasiswaResponse } from 'src/common/interfaces/mahasiswa-response.interface';

@Injectable()
export class MahasiswaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createMahasiswaDto: CreateMahasiswaDto,
  ): Promise<MahasiswaResponse> {
    await this.throwIfMahasiswaIsExist(createMahasiswaDto.NIM, true);
    return await this.prismaService.mahasiswa.create({
      data: createMahasiswaDto,
    });
  }

  async findAll(queries: QueriesMahasiswaDto): Promise<MahasiswaResponse[]> {
    if (queries.name) {
      return await this.findByQueries(queries);
    }
    return await this.prismaService.mahasiswa.findMany();
  }

  async findByQueries(
    queriesMahasiswaDto: QueriesMahasiswaDto,
  ): Promise<MahasiswaResponse[]> {
    return await this.prismaService.mahasiswa.findMany({
      where: {
        name: {
          contains: queriesMahasiswaDto.name,
        },
      },
    });
  }

  async findOne(NIM: number): Promise<MahasiswaResponse> {
    await this.throwIfMahasiswaIsExist(NIM, false);
    return await this.prismaService.mahasiswa.findUnique({ where: { NIM } });
  }

  async findOneWithTransaksi(NIM: number): Promise<MahasiswaResponse> {
    await this.throwIfMahasiswaIsExist(NIM, false);
    return await this.prismaService.mahasiswa.findUnique({
      where: { NIM },
      include: { transaksi: true },
    });
  }

  async update(
    NIM: number,
    updateMahasiswaDto: UpdateMahasiswaDto,
  ): Promise<MahasiswaResponse> {
    await this.throwIfMahasiswaIsExist(NIM, false);
    return await this.prismaService.mahasiswa.update({
      where: { NIM },
      data: updateMahasiswaDto,
    });
  }

  async remove(NIM: number): Promise<MahasiswaResponse> {
    await this.throwIfMahasiswaIsExist(NIM, false);
    return await this.prismaService.mahasiswa.delete({
      where: { NIM },
    });
  }

  async throwIfMahasiswaIsExist(NIM: number, exist: boolean): Promise<void> {
    const found = await this.prismaService.mahasiswa.findFirst({
      where: {
        NIM,
      },
    });
    if (exist && found) {
      throw new HttpException(
        toApiResponse('NIM sudah digunakan!'),
        HttpStatus.CONFLICT,
      );
    } else if (!exist && !found) {
      throw new HttpException(
        toApiResponse('NIM tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
