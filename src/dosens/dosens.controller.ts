import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { DosensService } from './dosens.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Controller('dosens')
export class DosensController {
  constructor(private readonly dosensService: DosensService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() createDosenDto: CreateDosenDto,
    @Res() response: Response,
  ) {
    const matkul = createDosenDto.matkul;
    const dosen = await this.dosensService.existingDosen(null, matkul);
    if (dosen) {
      return response
        .status(HttpStatus.CONFLICT)
        .json(toApiResponse('Matkul telah terdaftar!'));
    }
    const result = await this.dosensService.create(createDosenDto);
    return response
      .status(HttpStatus.OK)
      .json(toApiResponse('Berhasil menambahkan dosen!', result));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const dosens = await this.dosensService.findAll();
    return toApiResponse('OK!', dosens);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() response: Response,
  ) {
    const result = await this.dosensService.findOne(+id);
    if (!result) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(toApiResponse('Dosen tidak ditemukan!'));
    } else {
      return response
        .status(HttpStatus.OK)
        .send(toApiResponse('Data dosen ditemukan!', result));
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDosenDto: UpdateDosenDto,
    @Res() response: Response,
  ) {
    const dosen = await this.dosensService.existingDosen(+id);
    if (!dosen) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(toApiResponse('Dosen tidak ditemukan!'));
    } else {
      const newDosen = await this.dosensService.update(+id, updateDosenDto);
      return response
        .status(HttpStatus.OK)
        .send(toApiResponse('Berhasil update data dosen!', newDosen));
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() response: Response,
  ) {
    const dosen = await this.dosensService.findOne(+id);
    if (!dosen) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(toApiResponse('Dosen tidak ditemukan!'));
    } else {
      const result = await this.dosensService.remove(+id);
      return response
        .status(HttpStatus.OK)
        .send(toApiResponse('Berhasil menghapus data dosen!', result));
    }
  }
}
