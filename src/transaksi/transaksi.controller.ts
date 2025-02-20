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
  Query,
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
import { QueriesTransaksiDto } from './dto/queries-transaksi.dto';
import { AppLogger } from 'src/common/logger/logger.service';

@Controller('transaksi')
export class TransaksiController {
  constructor(
    private readonly transaksiService: TransaksiService,
    private readonly logger: AppLogger,
  ) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async create(
    @Body() createTransaksiDto: CreateTransaksiDto,
  ): Promise<ApiResponse<TransaksiResponse>> {
    const result = await this.transaksiService.create(createTransaksiDto);
    this.logger.log('Fetching create transaction', 'TransactionController');
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

  @Get('/all')
  async findAll(): Promise<ApiResponse<TransaksiResponse[]>> {
    this.logger.log('Fetching all transaction', 'TransactionController');
    const result = await this.transaksiService.findAll();
    const response = result.map((item) => toTransaksiResponse(item));
    return toApiResponse('Berhasil mendapatkan transaksi', response);
  }

  @Get()
  async findAllPaginate(
    @Query() queryTransaksiDto: QueriesTransaksiDto,
  ): Promise<ApiResponse<TransaksiResponse[]>> {
    this.logger.log('Fetching paginate transaction', 'TransactionController');
    const result =
      await this.transaksiService.findAllPaginated(queryTransaksiDto);
    return result;
  }

  @Get('/NIM/:NIM')
  async findByNIM(
    @Param(
      'NIM',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    NIM: number,
  ): Promise<ApiResponse<TransaksiResponse[]>> {
    this.logger.log('Fetching find(NIM) transactions', 'TransactionController');
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
    this.logger.log('Fetching get one transaction', 'TransactionController');
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
    this.logger.log('Fetching update transaction', 'TransactionController');
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
    this.logger.log('Fetching delete transaction', 'TransactionController');
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
