import { PrismaService } from '../../prisma.service';
import {
  toTransaksiResponse,
  TransaksiResponse,
} from '../../interfaces/transaksi-response.interface';

export class TestTransaksi {
  constructor(private prismaService: PrismaService) {}
  async getByNIM(NIM_mahasiswa: number): Promise<TransaksiResponse[]> {
    const transaksi = await this.prismaService.transaksi.findMany({
      where: { NIM_mahasiswa },
    });
    return transaksi.map((e) => toTransaksiResponse(e));
  }
  async findAll(): Promise<TransaksiResponse[]> {
    const transaksi = await this.prismaService.transaksi.findMany();
    return transaksi.map((e) => toTransaksiResponse(e));
  }
  async delete(NIM_mahasiswa: number) {
    await this.prismaService.transaksi.deleteMany({ where: { NIM_mahasiswa } });
  }
}
