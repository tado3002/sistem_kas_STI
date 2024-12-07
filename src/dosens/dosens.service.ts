import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DosensService {
  constructor(private prismaService: PrismaService) {}

  async create(createDosenDto: CreateDosenDto) {
    const matkul = createDosenDto.matkul;
    try {
      let dosen = await this.existingDosen(null, matkul);
      if (dosen) {
        return new HttpException(
          {
            status: 'error',
            message: 'Mata kuliah sudah terdaftar',
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      dosen = await this.prismaService.dosen.create({ data: createDosenDto });
      return {
        status: 'success',
        data: dosen,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const dosens = await this.prismaService.dosen.findMany();
      return {
        status: 'success',
        data: dosens,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const dosen = await this.existingDosen(id);
      if (!dosen) {
        return new HttpException(
          {
            status: 'error',
            message: `Dosen dengan ID ${id} tidak ditemukan!`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: 'success',
        data: dosen,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateDosenDto: UpdateDosenDto) {
    try {
      const dosen = await this.existingDosen(id);
      if (!dosen) {
        return new HttpException(
          {
            status: 'error',
            message: `Dosen dengan ID ${id} tidak ditemukan!`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const newDosen = await this.prismaService.dosen.update({
        where: { id },
        data: updateDosenDto,
      });
      return {
        status: 'success',
        data: newDosen,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const existDosen = await this.existingDosen(id);
      if (!existDosen) {
        return new HttpException(
          {
            status: 'error',
            message: `Dosen dengan ID ${id} tidak ditemukan!`,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        const dosen = await this.prismaService.dosen.delete({ where: { id } });
        return {
          status: 'success',
          data: dosen,
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 'error',
          message: 'server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async existingDosen(id?: number, matkul?: string) {
    if (id) return await this.prismaService.dosen.findUnique({ where: { id } });
    return await this.prismaService.dosen.findUnique({ where: { matkul } });
  }
}
