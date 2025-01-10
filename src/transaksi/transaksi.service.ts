import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { Transaksi } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import {
  Pagination,
  toApiResponse,
  ApiResponse,
} from '../common/interfaces/response.interface';
import { QueriesTransaksiDto } from './dto/queries-transaksi.dto';
import {
  toTransaksiResponse,
  TransaksiResponse,
} from 'src/common/interfaces/transaksi-response.interface';
import { toLinks } from 'src/common/utils/toLinks';

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
          data: { ...createTransaksiDto, nama: existedMahasiswa.name },
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

  async findAllPaginated(
    queryTransaksiDto: QueriesTransaksiDto,
  ): Promise<ApiResponse<TransaksiResponse[]>> {
    try {
      enum SortOrder {
        ASC = 'asc',
        DESC = 'desc',
      }
      let { sort, page, size } = queryTransaksiDto;
      const totalItem = await this.prismaService.transaksi.count();
      console.log('item berjumlah', totalItem);
      const totalPage = Math.ceil(totalItem / size);
      const skip = (page - 1) * size;

      let transactions: Transaksi[];
      if (totalItem === 0)
        return toApiResponse('berhasil mendapatkan data!', transactions);

      transactions = (await this.prismaService.transaksi.findMany({
        orderBy: { tanggal: sort },
        skip,
        take: size,
      })) as Transaksi[];

      const transactionItemsResponse = transactions.map((item) =>
        toTransaksiResponse(item),
      ) as TransaksiResponse[];

      const pagination: Pagination = {
        current: page,
        size,
        total_item: totalItem,
        total_page: totalPage,
        Links: toLinks('transaksi', page, size, totalPage),
      };

      return toApiResponse(
        'berhasil mendapatkan data!',
        transactionItemsResponse,
        pagination,
      );
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
