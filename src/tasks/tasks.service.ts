import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/prisma.service';
import {
  Pagination,
  toApiResponse,
} from 'src/common/interfaces/response.interface';
import {
  TaskPaginate,
  TaskResponse,
  toTaskResponse,
} from 'src/common/interfaces/task-response.interface';
import { QueriesTaskDto } from './dto/queries-task.dto';
import { toLinks } from 'src/common/utils/toLinks';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<void> {
    await this.throwIfDosenNotExist(createTaskDto.dosenId);
    await this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  async findAllPaginate(queriesTaskDto: QueriesTaskDto): Promise<TaskPaginate> {
    const total_item = await this.prismaService.task.count();
    const total_page = Math.ceil(total_item / queriesTaskDto.size);
    const skip = queriesTaskDto.size * (queriesTaskDto.page - 1);
    const page: Pagination = {
      current: queriesTaskDto.page,
      size: queriesTaskDto.size,
      total_item,
      total_page,
      Links: toLinks(
        'tasks',
        queriesTaskDto.page,
        queriesTaskDto.size,
        total_page,
      ),
    };

    if (total_item === 0) {
      return { page, data: [] };
    }
    const tasks = await this.prismaService.task.findMany({
      include: { dosen: true },
      orderBy: { deadline: queriesTaskDto.sort },
      skip,
    });
    return {
      data: tasks.map((task) => toTaskResponse(task)),
      page,
    };
  }

  async findAllIsPending(): Promise<TaskResponse[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        deadline: {
          gt: new Date(),
        },
      },
      include: { dosen: true },
    });
    return tasks.map((task) => toTaskResponse(task));
  }

  async isTaskIdExist(id: number): Promise<boolean> {
    return (
      (await this.prismaService.task.findFirst({
        where: { id },
      })) && true
    );
  }

  async findAll(): Promise<TaskResponse[]> {
    const tasks = await this.prismaService.task.findMany({
      include: { dosen: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tasks.map((task) => toTaskResponse(task));
  }

  async findOne(id: number): Promise<TaskResponse> {
    const task = await this.prismaService.task.findFirst({
      where: {
        id,
      },
      include: {
        dosen: true,
      },
    });
    if (!task) this.throwNotFound(`Task dengan id ${id} tidak ditemukan`);
    return toTaskResponse(task);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponse> {
    await this.throwIfTaskNotExist(id);
    await this.throwIfDosenNotExist(updateTaskDto.dosenId);

    await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
    return await this.findOne(id);
  }

  async remove(id: number): Promise<TaskResponse> {
    await this.throwIfTaskNotExist(id);

    return await this.prismaService.task.delete({
      where: { id },
      include: {
        dosen: true,
      },
    });
  }

  private async throwIfDosenNotExist(dosenId: number): Promise<void> {
    const found = await this.prismaService.dosen.findFirst({
      where: { id: dosenId },
    });
    if (!found) {
      this.throwNotFound(`Dosen dengan id ${dosenId} tidak ditemukan!`);
    }
  }

  private async throwIfTaskNotExist(taskId: number): Promise<void> {
    const found = await this.prismaService.task.findFirst({
      where: { id: taskId },
    });
    if (!found) {
      this.throwNotFound(`Task dengan id ${taskId} tidak ditemukan!`);
    }
  }

  private throwNotFound(message: string): never {
    throw new HttpException(toApiResponse(message), HttpStatus.NOT_FOUND);
  }
}
