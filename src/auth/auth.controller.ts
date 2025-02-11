import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  ApiResponse,
  toApiResponse,
} from '../common/interfaces/response.interface';
import {
  LoginResponse,
  RegisterResponse,
  toLoginResponse,
  toRegisterResponse,
} from '../common/interfaces/auth-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ApiResponse<RegisterResponse>> {
    const student = await this.authService.findStudent(
      registerUserDto.usernameByNIM,
    );
    if (!student) {
      throw new HttpException(
        toApiResponse('Mahasiswa belum terdaftar!'),
        HttpStatus.NOT_FOUND,
      );
    }
    if (student.User) {
      throw new HttpException(
        toApiResponse('Username telah digunakan!'),
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.authService.register(registerUserDto, student);
    return toRegisterResponse('Registrasi berhasil!', result);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ApiResponse<LoginResponse>> {
    const result = await this.authService.login(loginUserDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('Username atau password salah!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toLoginResponse('Berhasil login!', result.accessToken);
    }
  }
}
