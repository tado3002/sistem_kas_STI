import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { DosensService } from './dosens.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dosens')
export class DosensController {
  constructor(private readonly dosensService: DosensService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDosenDto: CreateDosenDto) {
    const matkul = createDosenDto.matkul;
    const dosen = await this.dosensService.existingDosen(null, matkul);
    if (dosen) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Mata kuliah sudah terdaftar',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }
    const result = await this.dosensService.create(createDosenDto);

    return {
      message: 'success',
      data: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const dosens = await this.dosensService.findAll();
    return {
      message: 'success',
      data: dosens,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const result = await this.dosensService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`Dosen dengan ID ${id} tidak ditemukan!`);
    }
    return {
      message: 'success',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateDosenDto: UpdateDosenDto,
  ) {
    const dosen = await this.dosensService.existingDosen(+id);
    if (!dosen) {
      throw new NotFoundException(`Dosen dengan ID ${id} tidak ditemukan!`);
    }
    const newDosen = await this.dosensService.update(+id, updateDosenDto);

    return {
      message: 'success',
      data: newDosen,
    };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.dosensService.remove(+id);
    if (!result)
      throw new NotFoundException(`Dosen dengan ID ${id} tidak ditemukan!`);
    return {
      message: 'Success delete dosen!',
    };
  }
}
