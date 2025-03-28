import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
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

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ApiResponse<string>> {
    try {
      await this.tasksService.create(createTaskDto);
      return toApiResponse('Berhasil menambahkan task!');
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }
  @Get()
  async findAllPaginate(
    @Query() queriesTaskDto: QueriesTaskDto,
  ): Promise<ApiResponse<TaskPaginate>> {
    try {
      const result = await this.tasksService.findAllPaginate(queriesTaskDto);
      return toApiResponse('Berhasil mendapatkan task!', result);
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }

  @Get('/all')
  async findAll(): Promise<ApiResponse<TaskResponse[]>> {
    try {
      return toApiResponse(
        'Berhasil mendapatkan data!',
        await this.tasksService.findAll(),
      );
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<TaskResponse>> {
    try {
      const result = await this.tasksService.findOne(+id);
      return toApiResponse('Berhasil mendapatkan task!', result);
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      await this.tasksService.update(+id, updateTaskDto);
      return toApiResponse(`Berhasil update task id ${id}`);
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.tasksService.remove(+id);
      return toApiResponse(`Berhasil menghapus task id ${id}`);
    } catch (error) {
      if (!(error instanceof InternalServerErrorException)) {
        throw error;
      }
      this.logger.error(
        'Failed to fetch create',
        error.stack,
        'TasksController',
      );
      throw new InternalServerErrorException('internal server error!');
    }
  }
}
