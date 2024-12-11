import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DosensService {
  constructor(private prismaService: PrismaService) {}

  async create(createDosenDto: CreateDosenDto) {
    try {
      return await this.prismaService.dosen.create({
        data: createDosenDto,
      });
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
      return await this.prismaService.dosen.findMany();
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
      return await this.existingDosen(id);
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
      return await this.prismaService.dosen.update({
        where: { id },
        data: updateDosenDto,
      });
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
      return await this.prismaService.dosen.delete({ where: { id } });
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
