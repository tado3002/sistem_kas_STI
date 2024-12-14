import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import {
  LoginResponse,
  RegisterResponse,
} from 'src/common/interfaces/auth-response.interface';
import { toUserResponse } from 'src/common/interfaces/user-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private prismaService: PrismaService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          AND: [
            { username: loginUserDto.username },
            { password: loginUserDto.password },
          ],
        },
      });

      if (!user) return { accessToken: null, user: null };

      const payload = {
        username: user.username,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, user: toUserResponse(user) };
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
      const user = await this.usersService.findByUsername(
        registerUserDto.username,
      );
      if (user) return null;

      const result = await this.usersService.create(registerUserDto);
      return {
        name: result.name,
        username: result.username,
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
