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
  Query,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { AdminGuard } from '../auth/admin/admin.guard';
import {
  ApiResponse,
  toApiResponse,
} from '../common/interfaces/response.interface';
import {
  MahasiswaResponse,
  toMahasiswaResponse,
} from '../common/interfaces/mahasiswa-response.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppLogger } from 'src/common/logger/logger.service';
import { QueriesMahasiswaDto } from './dto/queries-mahasiswa.dto';
import { Mahasiswa } from '@prisma/client';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(
    private readonly mahasiswaService: MahasiswaService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(
    @Body() createMahasiswaDto: CreateMahasiswaDto,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    const mahasiswa = await this.mahasiswaService.create(createMahasiswaDto);
    this.logger.log('Fetching create mahasiswa', 'MahasiswaController');
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('NIM sudah digunakan!'),
        HttpStatus.CONFLICT,
      );
    } else {
      return toApiResponse(
        'Berhasil menambahkan data mahasiswa',
        toMahasiswaResponse(mahasiswa),
      );
    }
  }

  @Get()
  async findAll(
    @Query() queriesMahasiswaDto: QueriesMahasiswaDto,
  ): Promise<ApiResponse<MahasiswaResponse[]>> {
    this.logger.log('Fetching all mahasiswa', 'MahasiswaController');
    let result: Mahasiswa[];

    if (queriesMahasiswaDto.name) {
      result = await this.mahasiswaService.findByQueries(queriesMahasiswaDto);
    } else result = await this.mahasiswaService.findAll();
    const data = result?.map((mahasiswa) => toMahasiswaResponse(mahasiswa));
    return toApiResponse('Berhasil mendapatkan data-data mahasiswa!', data);
  }

  @Get(':NIM')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    this.logger.log(
      `Fetching get mahasiswa by NIM ${NIM}`,
      'MahasiswaController',
    );
    const mahasiswa = await this.mahasiswaService.findOne(+NIM);
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    return toApiResponse('success!', toMahasiswaResponse(mahasiswa));
  }

  @Patch(':NIM')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    this.logger.log(
      `Fetching update mahasiswa with NIM ${NIM}`,
      'MahasiswaController',
    );
    const mahasiswa = await this.mahasiswaService.update(
      +NIM,
      updateMahasiswaDto,
    );
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse(
        'success mengupdate data!',
        toMahasiswaResponse(mahasiswa),
      );
    }
  }

  @Delete(':NIM')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    this.logger.log(
      `Fetching delete mahasiswa with NIM ${NIM}`,
      'MahasiswaController',
    );
    const mahasiswa = await this.mahasiswaService.remove(+NIM);
    if (!mahasiswa) {
      throw new HttpException(
        toApiResponse('Data mahasiswa tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    return toApiResponse(
      'success menghapus data!',
      toMahasiswaResponse(mahasiswa),
    );
  }
}
