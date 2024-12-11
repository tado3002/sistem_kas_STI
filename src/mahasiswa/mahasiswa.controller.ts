import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMahasiswaDto: CreateMahasiswaDto) {
    const mahasiswa = await this.mahasiswaService.findOne(
      createMahasiswaDto.NIM,
    );
    if (mahasiswa) {
      return new ConflictException('NIM mahasiswa telah dipakai!');
    }
    return this.mahasiswaService.create(createMahasiswaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.mahasiswaService.findAll();
  }

  @Get(':NIM')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('NIM') NIM: string) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new NotFoundException('mahasiswa tidak ditemukan!');
    }
    return mahasiswa;
  }

  @Patch(':NIM')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('NIM') NIM: string,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new NotFoundException('mahasiswa tidak ditemukan!');
    }
    return await this.mahasiswaService.update(+NIM, updateMahasiswaDto);
  }

  @Delete(':NIM')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('NIM') NIM: string) {
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new NotFoundException('mahasiswa tidak ditemukan!');
    }

    return await this.mahasiswaService.remove(+NIM);
  }
}
