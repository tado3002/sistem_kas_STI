import {
  MahasiswaResponse,
  toMahasiswaResponse,
} from '../../../common/interfaces/mahasiswa-response.interface';
import { PrismaService } from '../../prisma.service';
import { CreateMahasiswaDto } from '../../../mahasiswa/dto/create-mahasiswa.dto';

export class TestMahasiswa {
  constructor(private prismaService: PrismaService) {}
  async create(createData: CreateMahasiswaDto): Promise<void> {
    const existedMahasiswa = await this.getByNIM(createData.NIM);
    if (existedMahasiswa) {
      await this.delete(existedMahasiswa.NIM);
    }
    await this.prismaService.mahasiswa.create({
      data: { ...createData },
    });
  }
  async delete(NIM: number): Promise<void> {
    const existedMahasiswa = await this.getByNIM(NIM);
    if (existedMahasiswa) {
      await this.prismaService.mahasiswa.delete({ where: { NIM } });
    }
  }
  async getByNIM(NIM: number): Promise<MahasiswaResponse | null> {
    const mahasiswa = await this.prismaService.mahasiswa.findUnique({
      where: { NIM },
    });
    if (mahasiswa) {
      return toMahasiswaResponse(mahasiswa);
    } else return null;
  }
  async getAll(): Promise<MahasiswaResponse[]> {
    const allMahasiswa = await this.prismaService.mahasiswa.findMany();
    return allMahasiswa.map((e) => toMahasiswaResponse(e));
  }
}
