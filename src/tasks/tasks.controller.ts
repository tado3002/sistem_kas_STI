import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AppLogger } from 'src/common/logger/logger.service';
import {
  ApiResponse,
  toApiResponse,
} from 'src/common/interfaces/response.interface';
import {
  TaskPaginate,
  TaskResponse,
} from 'src/common/interfaces/task-response.interface';
import { QueriesTaskDto } from './dto/queries-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { BaseController } from 'src/common/controllers/base.controller';

@Controller('tasks')
export class TasksController extends BaseController {
  constructor(
    private readonly tasksService: TasksService,
    protected readonly logger: AppLogger,
  ) {
    super(logger);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ApiResponse<string>> {
    return this.handle(
      () =>
        this.tasksService
          .create(createTaskDto)
          .then(() => toApiResponse('Berhasil menambahkan task!')),
      'create',
    );
  }

  @Get()
  async findAllPaginate(
    @Query() queriesTaskDto: QueriesTaskDto,
  ): Promise<ApiResponse<TaskPaginate>> {
    return this.handle(
      () =>
        this.tasksService
          .findAllPaginate(queriesTaskDto)
          .then((result) =>
            toApiResponse('Berhasil mendapatkan semua task!', result),
          ),
      'findAllPaginate',
    );
  }

  @Get('/all')
  async findAll(): Promise<ApiResponse<TaskResponse[]>> {
    return this.handle(
      () =>
        this.tasksService
          .findAll()
          .then((result) =>
            toApiResponse('Berhasil mendapatkan semua task!', result),
          ),
      'findAll',
    );
  }

  @Get('/pending')
  async findAllPending(): Promise<ApiResponse<TaskResponse[]>> {
    return this.handle(
      () =>
        this.tasksService
          .findAllIsPending()
          .then((result) =>
            toApiResponse('Berhasil mendapatkan semua task!', result),
          ),
      'findAllIsPending',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<TaskResponse>> {
    return this.handle(
      () =>
        this.tasksService
          .update(+id, updateTaskDto)
          .then((result) =>
            toApiResponse('Berhasil memperbarui task!', result),
          ),
      'update',
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<ApiResponse<TaskResponse>> {
    return this.handle(
      () =>
        this.tasksService
          .remove(+id)
          .then((result) => toApiResponse('Berhasil menghapus task!', result)),
      'remove',
    );
  }
}
