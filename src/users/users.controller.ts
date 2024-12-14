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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiResponse,
  toApiResponse,
} from 'src/common/interfaces/response.interface';
import {
  toUserResponse,
  UserResponse,
} from 'src/common/interfaces/user-response.interface';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<UserResponse[]>> {
    const result = await this.usersService.findAll();
    const response = result.map((user) => toUserResponse(user));
    return toApiResponse('success!', response);
  }

  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException(
        toApiResponse('user tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      const result = await this.usersService.update(+id, updateUserDto);
      const response = toUserResponse(result);
      return toApiResponse('success!', response);
    }
  }

  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException(
        toApiResponse('user tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.usersService.remove(+id);
      return toApiResponse('success!');
    }
  }
}
