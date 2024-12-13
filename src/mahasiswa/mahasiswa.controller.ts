import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createMahasiswaDto: CreateMahasiswaDto) {
    const mahasiswa = await this.mahasiswaService.findOne(
      createMahasiswaDto.NIM,
    );
    if (mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.CONFLICT,
      );
    }
    await this.mahasiswaService.create(createMahasiswaDto);
    return toApiResponse('Berhasil menambahkan data mahasiswa');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const result = await this.mahasiswaService.findAll();
    return toApiResponse('success!', result);
  }

  @Get(':NIM')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    return toApiResponse('success!', mahasiswa);
  }

  @Patch(':NIM')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.mahasiswaService.update(+NIM, updateMahasiswaDto);
    return toApiResponse('success mengupdate data!', result);
  }

  @Delete(':NIM')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.mahasiswaService.remove(+NIM);
    return toApiResponse('success menghapus data!');
  }
}
