import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  LoginResponse,
  RegisterResponse,
} from '../common/interfaces/auth-response.interface';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          AND: [
            { usernameByNIM: loginUserDto.usernameByNIM },
            { password: loginUserDto.password },
          ],
        },
      });

      if (!user) return null;

      const payload = {
        username: user.usernameByNIM,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async register(registerUserDto: RegisterUserDto): Promise<RegisterResponse> {
    try {
      const existingUser = await this.prismaService.mahasiswa.findUnique({
        where: { NIM: registerUserDto.usernameByNIM },
        include: { User: true },
      });
      if (existingUser?.User) return null;

      const createUser = await this.prismaService.user.create({
        data: { ...registerUserDto, name: existingUser.name },
      });

      return {
        name: createUser.name,
        usernameByNIM: createUser.usernameByNIM,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
