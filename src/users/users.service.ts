import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from '../common/interfaces/user-response.interface';
import { User } from '@prisma/client';
import { toApiResponse } from '../common/interfaces/response.interface';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // cari mahasiswa berdasarkan usernameByNIM
      const mahasiswaByNIM = await this.prismaService.mahasiswa.findUnique({
        where: { NIM: createUserDto.usernameByNIM },
      });
      if (mahasiswaByNIM) {
        // buat data jika ditemukan
        const createdUser = await this.prismaService.user.create({
          data: { ...createUserDto, name: mahasiswaByNIM.name },
        });

        return createdUser;
      } else {
        // kembalikan null jika tidak ditemukan
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(usernameByNIM: number): Promise<UserResponse> {
    try {
      return await this.prismaService.user.findUnique({
        where: { usernameByNIM },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    usernameByNIM: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      // cari mahasiswa berdasarkan usernameByNIM
      const mahasiswaByNIM = await this.prismaService.mahasiswa.findUnique({
        where: { NIM: usernameByNIM },
      });
      if (mahasiswaByNIM) {
        // buat data jika ditemukan
        return await this.prismaService.user.update({
          where: { usernameByNIM },
          data: updateUserDto,
        });
      } else {
        // kembalikan null jika tidak ditemukan
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(NIM: number): Promise<User> {
    try {
      const mahasiswa = await this.findOne(NIM);
      if (mahasiswa) {
        return await this.prismaService.user.delete({
          where: { usernameByNIM: NIM },
        });
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findByUsername(NIM: number): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: { usernameByNIM: NIM },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
