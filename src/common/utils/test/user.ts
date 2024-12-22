import { Role } from '@prisma/client';
import {
  toUserResponse,
  UserResponse,
} from '../../interfaces/user-response.interface';
import { PrismaService } from '../../prisma.service';
import { RegisterUserDto } from '../../../auth/dto/register-user.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { LoginUserDto } from '../../../auth/dto/login-user.dto';
import { LoginResponse } from '../../../common/interfaces/auth-response.interface';

export class TestUser {
  constructor(private prismaService: PrismaService) {}
  async getByNIM(usernameByNIM: number): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { usernameByNIM },
    });
    return toUserResponse(user);
  }
  async delete(usernameByNIM: number): Promise<void> {
    const existedUser = await this.getByNIM(usernameByNIM);
    if (existedUser) {
      await this.prismaService.user.delete({
        where: { usernameByNIM },
      });
    }
  }
  async getAll(): Promise<UserResponse[]> {
    const user = await this.prismaService.user.findMany();
    return user.map((e) => toUserResponse(e));
  }
  async updateRole(usernameByNIM: number, role: Role) {
    try {
      await this.prismaService.user.update({
        data: { role },
        where: { usernameByNIM },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async register(registerUserDto: RegisterUserDto, app: INestApplication) {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerUserDto);
    console.log(response.body);
  }
  async login(
    loginUserDto: LoginUserDto,
    app: INestApplication,
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginUserDto);
    console.log(response.body);
    const dataResponse = response.body.data as LoginResponse;
    return dataResponse.accessToken;
  }
}
