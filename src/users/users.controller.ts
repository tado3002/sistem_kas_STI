import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const result = await this.usersService.findAll();
      return toApiResponse('success!', result);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      const result = await this.usersService.findOne(id);
      if (!result) {
        throw new HttpException(
          toApiResponse(`user dengan ID ${id} tidak ditemukan!`),
          HttpStatus.NOT_FOUND,
        );
      }
      return toApiResponse('success!', result);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new HttpException(
          toApiResponse(`user dengan ID ${id} tidak ditemukan!`),
          HttpStatus.NOT_FOUND,
        );
      } else {
        const result = await this.usersService.update(+id, updateUserDto);
        return toApiResponse('success!', result);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new HttpException(
          toApiResponse(`user dengan ID ${id} tidak ditemukan!`),
          HttpStatus.NOT_FOUND,
        );
      } else {
        await this.usersService.remove(+id);
        return toApiResponse('success!');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
