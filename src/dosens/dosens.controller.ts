import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DosensService } from './dosens.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';

@Controller('dosens')
export class DosensController {
  constructor(private readonly dosensService: DosensService) {}

  @Post()
  create(@Body() createDosenDto: CreateDosenDto) {
    return this.dosensService.create(createDosenDto);
  }

  @Get()
  findAll() {
    return this.dosensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dosensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDosenDto: UpdateDosenDto) {
    return this.dosensService.update(+id, updateDosenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dosensService.remove(+id);
  }
}
