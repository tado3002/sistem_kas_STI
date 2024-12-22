import {
  DosenResponse,
  toDosenResponse,
} from '../../../common/interfaces/dosen-response.interface';
import { PrismaService } from 'src/common/prisma.service';

export class TestDosen {
  constructor(private prismaService: PrismaService) {}
  async getByMatkul(matkul: string): Promise<DosenResponse> {
    const dosen = await this.prismaService.dosen.findUnique({
      where: { matkul },
    });
    return toDosenResponse(dosen);
  }
}
