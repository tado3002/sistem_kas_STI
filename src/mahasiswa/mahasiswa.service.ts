import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { Mahasiswa } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { QueriesMahasiswaDto } from './dto/queries-mahasiswa.dto';
import { queryObjects } from 'v8';

@Injectable()
export class MahasiswaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMahasiswaDto: CreateMahasiswaDto): Promise<Mahasiswa> {
    try {
      // mencari data mahasiswa berdasarkan NIM
      const mahasiswa = await this.findOne(createMahasiswaDto.NIM);
      if (!mahasiswa) {
        // jika ditemukan tidak ditemukan
        return await this.prismaService.mahasiswa.create({
          data: createMahasiswaDto,
        });
      } else {
        // jika data mahasiswa tidak ditemukan
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Mahasiswa[]> {
    try {
      // mengambil semua data mahasiswa
      return await this.prismaService.mahasiswa.findMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findByQueries(
    queriesMahasiswaDto: QueriesMahasiswaDto,
  ): Promise<Mahasiswa[]> {
    try {
      return await this.prismaService.mahasiswa.findMany({
        where: {
          name: {
            contains: queriesMahasiswaDto.name,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(NIM: number): Promise<Mahasiswa> {
    try {
      // mengambil data mahasiswa berdasarkan NIM
      return await this.prismaService.mahasiswa.findUnique({ where: { NIM } });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOneWithTransaksi(NIM: number): Promise<Mahasiswa> {
    try {
      // mengambil semua data mahasiswa
      return await this.prismaService.mahasiswa.findUnique({
        where: { NIM },
        include: { transaksi: true },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(
    NIM: number,
    updateMahasiswaDto: UpdateMahasiswaDto,
  ): Promise<Mahasiswa> {
    try {
      // mengambil data mahasiswa berdasarkan NIM
      const mahasiswa = await this.findOne(+NIM);
      if (mahasiswa) {
        // update data jika data ditemukan
        return await this.prismaService.mahasiswa.update({
          where: { NIM },
          data: updateMahasiswaDto,
        });
      } else {
        // kembalikan null jika mahasiswa tidak ditemukan
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(NIM: number): Promise<Mahasiswa> {
    try {
      // mengambil data mahasiswa berdasarkan NIM
      const mahasiswa = await this.findOne(+NIM);
      if (mahasiswa) {
        // hapus data jika data ditemukan
        return await this.prismaService.mahasiswa.delete({
          where: { NIM },
        });
      } else {
        // kembalikan null jika mahasiswa tidak ditemukan
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
