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
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.register(registerUserDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('Username telah digunakan!'),
        HttpStatus.CONFLICT,
      );
    }
    return toApiResponse('Registrasi berhasil!');
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.authService.login(loginUserDto);
    if (!result.accessToken) {
      throw new HttpException(
        toApiResponse('Username atau password salah!', result),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse('Berhasil login!', result);
    }
  }
}
