import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mahasiswa } from '@prisma/client';

@Injectable()
export class MahasiswaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMahasiswaDto: CreateMahasiswaDto): Promise<Mahasiswa> {
    try {
      return await this.prismaService.mahasiswa.create({
        data: createMahasiswaDto,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Mahasiswa[]> {
    try {
      return await this.prismaService.mahasiswa.findMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(NIM: number): Promise<Mahasiswa> {
    try {
      return await this.prismaService.mahasiswa.findUnique({ where: { NIM } });
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
      return await this.prismaService.mahasiswa.update({
        where: { NIM },
        data: updateMahasiswaDto,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(NIM: number): Promise<Mahasiswa> {
    try {
      return await this.prismaService.mahasiswa.delete({
        where: { NIM },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
