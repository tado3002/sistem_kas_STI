import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginData } from 'src/common/interfaces/auth-response.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private prismaService: PrismaService,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<LoginData> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          AND: [
            { username: loginUserDto.username },
            { password: loginUserDto.password },
          ],
        },
      });

      if (!user) return { accessToken: null };

      const payload = {
        username: user.username,
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
  async register(registerUserDto: RegisterUserDto): Promise<User | null> {
    try {
      const user = await this.usersService.findByUsername(
        registerUserDto.username,
      );
      if (user) return null;

      return await this.usersService.create(registerUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
