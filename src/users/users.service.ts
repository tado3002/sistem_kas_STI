import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from 'src/common/interfaces/user-response.interface';
import { User } from '@prisma/client';
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prismaService.user.create({ data: createUserDto });
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

  async findOne(id: number): Promise<UserResponse> {
    try {
      return await this.prismaService.user.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findByUsername(username: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({ where: { username } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        toApiResponse('Internal server error!'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
