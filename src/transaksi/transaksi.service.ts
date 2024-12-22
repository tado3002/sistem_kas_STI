import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { Transaksi } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { toApiResponse } from '../common/interfaces/response.interface';

@Injectable()
export class TransaksiService {
  constructor(private prismaService: PrismaService) {}
  async create(createTransaksiDto: CreateTransaksiDto): Promise<Transaksi> {
    try {
      const existedMahasiswa = await this.prismaService.mahasiswa.findUnique({
        where: { NIM: createTransaksiDto.NIM_mahasiswa },
      });
      if (!existedMahasiswa) return null;
      else {
        const createTransaksi = await this.prismaService.transaksi.create({
          data: { ...createTransaksiDto },
        });
        return createTransaksi;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Transaksi[]> {
    try {
      const allTransaksi = await this.prismaService.transaksi.findMany();
      return allTransaksi;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByNIM(NIM: number): Promise<Transaksi[]> {
    try {
      const existedMahasiswa = await this.prismaService.mahasiswa.findUnique({
        where: { NIM },
      });
      if (existedMahasiswa) {
        const transaksi = await this.prismaService.transaksi.findMany({
          where: { NIM_mahasiswa: NIM },
        });
        return transaksi;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Transaksi> {
    try {
      const existedTransaksi = await this.prismaService.transaksi.findUnique({
        where: { id },
      });
      return existedTransaksi;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateTransaksiDto: UpdateTransaksiDto,
  ): Promise<Transaksi> {
    try {
      const existedTransaksi = await this.prismaService.transaksi.findUnique({
        where: { id },
      });
      if (!existedTransaksi) return null;
      else {
        const newTransaksi = await this.prismaService.transaksi.update({
          data: { ...updateTransaksiDto },
          where: { id },
        });
        return newTransaksi;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Transaksi> {
    try {
      const existedTransaksi = await this.prismaService.transaksi.findUnique({
        where: { id },
      });
      if (!existedTransaksi) return null;
      else {
        const deletedTransaksi = await this.prismaService.transaksi.delete({
          where: { id },
        });
        return deletedTransaksi;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
