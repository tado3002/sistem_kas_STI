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
  ParseIntPipe,
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
import { MahasiswaResponse } from '../common/interfaces/mahasiswa-response.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppLogger } from 'src/common/logger/logger.service';
import { QueriesMahasiswaDto } from './dto/queries-mahasiswa.dto';
import { BaseController } from 'src/common/controllers/base.controller';

@Controller('mahasiswa')
export class MahasiswaController extends BaseController {
  constructor(
    private readonly mahasiswaService: MahasiswaService,
    protected readonly logger: AppLogger,
  ) {
    super(logger);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(
    @Body() createMahasiswaDto: CreateMahasiswaDto,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    return this.handle(
      () =>
        this.mahasiswaService
          .create(createMahasiswaDto)
          .then((result) =>
            toApiResponse('Berhasil menambahkan data mahasiswa!', result),
          ),
      'Create mahasiswa',
    );
  }

  @Get()
  async findAll(
    @Query() queriesMahasiswaDto: QueriesMahasiswaDto,
  ): Promise<ApiResponse<MahasiswaResponse[]>> {
    return this.handle(
      () =>
        this.mahasiswaService
          .findAll(queriesMahasiswaDto)
          .then((result) =>
            toApiResponse('Berhasil mendapatkan data mahasiswa!', result),
          ),
      'Find all mahasiswa',
    );
  }

  @Get(':NIM')
  async findOne(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: string,
  ): Promise<ApiResponse<MahasiswaResponse>> {
    return this.handle(
      () =>
        this.mahasiswaService
          .findOne(+NIM)
          .then((result) =>
            toApiResponse('Berhasil mendapatkan data mahasiswa!', result),
          ),
      'Find one mahasiswa',
    );
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
    return this.handle(
      () =>
        this.mahasiswaService
          .update(NIM, updateMahasiswaDto)
          .then((result) =>
            toApiResponse('Berhasil memperbarui data mahasiswa!', result),
          ),
      'Update mahasiswa',
    );
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
    return this.handle(
      () =>
        this.mahasiswaService
          .remove(NIM)
          .then((result) =>
            toApiResponse('Berhasil menghapus data mahasiswa!', result),
          ),
      'Delete mahasiswa',
    );
  }
}
