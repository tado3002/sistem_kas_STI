import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private prismaService: PrismaService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        AND: [
          { username: loginUserDto.username },
          { password: loginUserDto.password },
        ],
      },
    });

    if (!user)
      return new HttpException(
        'username atau password salah!',
        HttpStatus.NOT_FOUND,
      );

    const payload = {
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findByUsername(
      registerUserDto.username,
    );
    if (user)
      throw new HttpException(
        {
          status: 'error',
          message: 'username telah digunakan!',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    await this.usersService.create(registerUserDto);
  }
}
