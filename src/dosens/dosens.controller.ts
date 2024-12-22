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
  HttpException,
} from '@nestjs/common';
import { DosensService } from './dosens.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { AdminGuard } from '../auth/admin/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiResponse,
  toApiResponse,
} from '../common/interfaces/response.interface';
import {
  DosenResponse,
  toDosenResponse,
} from '../common/interfaces/dosen-response.interface';

@Controller('dosens')
export class DosensController {
  constructor(private readonly dosensService: DosensService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() createDosenDto: CreateDosenDto,
  ): Promise<ApiResponse<DosenResponse>> {
    const result = await this.dosensService.create(createDosenDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('matkul telah ada!'),
        HttpStatus.CONFLICT,
      );
    }
    return toApiResponse(
      'Berhasil menambahkan dosen!',
      toDosenResponse(result),
    );
  }

  @Get()
  async findAll(): Promise<ApiResponse<DosenResponse[]>> {
    const dosens = await this.dosensService.findAll();
    const data = dosens?.map((dosen) => toDosenResponse(dosen));
    return toApiResponse('Berhasil mengambil data-data dosen', data);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ApiResponse<DosenResponse>> {
    const result = await this.dosensService.findOne(+id);
    if (!result) {
      throw new HttpException(
        toApiResponse('Dosen tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse('Data dosen ditemukan!', toDosenResponse(result));
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
  ): Promise<ApiResponse<DosenResponse>> {
    const result = await this.dosensService.update(+id, updateDosenDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('Dosen tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse(
        'Data dosen berhasil diupdate!',
        toDosenResponse(result),
      );
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
  ): Promise<ApiResponse<DosenResponse>> {
    const result = await this.dosensService.remove(+id);
    if (!result) {
      throw new HttpException(
        toApiResponse('Dosen tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return toApiResponse(
        'Berhasil menghapus data dosen!',
        toDosenResponse(result),
      );
    }
  }
}
