import { Dosen, Task } from '@prisma/client';
import { Pagination } from './response.interface';

export interface TaskPaginate {
  data: TaskResponse[];
  page: Pagination;
}

export interface TaskResponse {
  id: number;
  dosen: Dosen;
  title: string;
  description: string;
  deadline: Date;
  createdAt: Date;
}

export function toTaskResponse(task: Task & { dosen: Dosen }): TaskResponse {
  return {
    id: task.id,
    dosen: task.dosen,
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    createdAt: task.createdAt,
  };
}
