import { Dosen, Task } from '@prisma/client';
import { Pagination } from './response.interface';

export interface TaskPaginate {
  data: TaskResponse[];
  page: Pagination;
}

export interface TaskResponse {
  id: number;
  matkul: string;
  namaDosen: string;
  deskripsi: string;
  deadline: Date;
  createdAt: Date;
}

export function toTaskResponse(task: Task & { dosen: Dosen }): TaskResponse {
  return {
    id: task.id,
    matkul: task.dosen.matkul,
    namaDosen: task.dosen.name,
    deskripsi: task.description,
    deadline: task.deadline,
    createdAt: task.createdAt,
  };
}
