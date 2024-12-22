import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import {
  ApiResponse,
  toApiResponse,
} from '../common/interfaces/response.interface';
import {
  toTransaksiResponse,
  TransaksiResponse,
} from '../common/interfaces/transaksi-response.interface';
import { AdminGuard } from '../auth/admin/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() createTransaksiDto: CreateTransaksiDto,
  ): Promise<ApiResponse<TransaksiResponse>> {
    const result = await this.transaksiService.create(createTransaksiDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('NIM tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    return toApiResponse(
      'Berhasil membuat data transaksi!',
      toTransaksiResponse(result),
    );
  }

  @Get()
  async findAll(): Promise<ApiResponse<TransaksiResponse[]>> {
    const result = await this.transaksiService.findAll();
    const transaksiResponse = result.map((transaksi) =>
      toTransaksiResponse(transaksi),
    );
    return toApiResponse(
      'Berhasil mendapatkan semua data transaksi!',
      transaksiResponse,
    );
  }

  @Get('/NIM/:NIM')
  async findByNIM(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ): Promise<ApiResponse<TransaksiResponse[]>> {
    const result = await this.transaksiService.findByNIM(+NIM);
    if (!result) {
      throw new HttpException(
        toApiResponse('NIM tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }

    return toApiResponse(
      `Berhasil mendapatkan data transaksi berdasarkan NIM ${NIM}`,
      result.map((transaksi) => toTransaksiResponse(transaksi)),
    );
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ApiResponse<TransaksiResponse>> {
    const result = await this.transaksiService.findOne(+id);
    if (!result) {
      throw new HttpException(
        toApiResponse('ID transaksi tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }
    return toApiResponse(
      'Berhasil mendapatkan data transaksi!',
      toTransaksiResponse(result),
    );
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateTransaksiDto: UpdateTransaksiDto,
  ): Promise<ApiResponse<TransaksiResponse>> {
    const result = await this.transaksiService.update(+id, updateTransaksiDto);
    if (!result) {
      throw new HttpException(
        toApiResponse('ID transaksi tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }

    return toApiResponse(
      'Berhasil mengupdate data transaksi!',
      toTransaksiResponse(result),
    );
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ApiResponse<TransaksiResponse>> {
    const result = await this.transaksiService.remove(+id);
    if (!result) {
      throw new HttpException(
        toApiResponse('ID transaksi tidak ditemukan!'),
        HttpStatus.NOT_FOUND,
      );
    }

    return toApiResponse(
      'Berhasil menghapus data transaksi!',
      toTransaksiResponse(result),
    );
  }
}
