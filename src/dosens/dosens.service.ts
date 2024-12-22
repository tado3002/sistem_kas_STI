import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { Dosen } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DosensService {
  constructor(private prismaService: PrismaService) {}

  async create(createDosenDto: CreateDosenDto): Promise<Dosen> {
    try {
      const existedDosen = await this.prismaService.dosen.findUnique({
        where: { matkul: createDosenDto.matkul },
      });
      if (existedDosen) {
        return null;
      } else {
        return await this.prismaService.dosen.create({
          data: createDosenDto,
        });
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

  async findAll(): Promise<Dosen[]> {
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

  async findOne(id: number): Promise<Dosen> {
    try {
      return await this.prismaService.dosen.findUnique({ where: { id } });
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

  async update(id: number, updateDosenDto: UpdateDosenDto): Promise<Dosen> {
    try {
      const existedDosen = await this.prismaService.dosen.findUnique({
        where: { id },
      });
      if (!existedDosen) {
        return null;
      } else {
        return await this.prismaService.dosen.update({
          where: { id },
          data: updateDosenDto,
        });
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

  async remove(id: number): Promise<Dosen> {
    try {
      const existedDosen = await this.prismaService.dosen.findUnique({
        where: { id },
      });
      if (!existedDosen) {
        return null;
      } else {
        return await this.prismaService.dosen.delete({ where: { id } });
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
}
