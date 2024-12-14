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
  HttpException,
} from '@nestjs/common';
import { DosensService } from './dosens.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiResponse,
  toApiResponse,
} from 'src/common/interfaces/response.interface';
import {
  DosenResponse,
  toDosenResponse,
} from 'src/common/interfaces/dosen-response.interface';

@Controller('dosens')
export class DosensController {
  constructor(private readonly dosensService: DosensService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() createDosenDto: CreateDosenDto,
  ): Promise<ApiResponse<DosenResponse>> {
    const matkul = createDosenDto.matkul;
    const dosen = await this.dosensService.existingDosen(null, matkul);
    if (dosen) {
      throw new HttpException(
        toApiResponse('matkul telah ada!'),
        HttpStatus.CONFLICT,
      );
    }
    const result = await this.dosensService.create(createDosenDto);
    return toApiResponse(
      'Berhasil menambahkan dosen!',
      toDosenResponse(result),
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<DosenResponse[]>> {
    const dosens = await this.dosensService.findAll();
    const data = dosens?.map((dosen) => toDosenResponse(dosen));
    return toApiResponse('Berhasil mengambil data-data dosen', data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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
    const dosen = await this.dosensService.existingDosen(+id);
    if (!dosen) {
      throw new HttpException(
        toApiResponse('Dosen tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      const newDosen = await this.dosensService.update(+id, updateDosenDto);
      return toApiResponse(
        'Data dosen berhasil diupdate!',
        toDosenResponse(newDosen),
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
    const dosen = await this.dosensService.findOne(+id);
    if (!dosen) {
      throw new HttpException(
        toApiResponse('Dosen tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    } else {
      const result = await this.dosensService.remove(+id);
      return toApiResponse(
        'Berhasil menghapus data dosen!',
        toDosenResponse(result),
      );
    }
  }
}
