import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  HttpCode,
  ParseIntPipe,
  HttpException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../auth/admin/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiResponse,
  toApiResponse,
} from '../common/interfaces/response.interface';
import {
  toUserResponse,
  UserResponse,
} from '../common/interfaces/user-response.interface';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<UserResponse[]>> {
    const result = await this.usersService.findAll();
    const response = result.map((user) => toUserResponse(user));
    return toApiResponse('success!', response);
  }

  @Get('profile')
  async userProfile(
    @Req() request: Request,
  ): Promise<ApiResponse<UserResponse>> {
    const userResponse = request.user as User;
    return toApiResponse(
      'Berhasil mendapatkan data profil!',
      toUserResponse(userResponse),
    );
  }

  @Patch(':NIM')
  @UseGuards(AdminGuard)
  async update(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponse>> {
    const result = await this.usersService.update(NIM, updateUserDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('user tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      const response = toUserResponse(result);
      return toApiResponse('success!', response);
    }
  }

  @Delete(':NIM')
  @UseGuards(AdminGuard)
  async remove(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ): Promise<ApiResponse<UserResponse>> {
    const result = await this.usersService.remove(+NIM);
    if (!result) {
      throw new HttpException(
        toApiResponse('user tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse('success!', toUserResponse(result));
    }
  }
}
