export type Link = {
  active: boolean;
  label: string;
  url: null | string;
};
export interface Pagination {
  current: number;
  size: number;
  total_page: number;
  total_item: number;
  Links: Link[];
}
export interface ApiResponse<T> {
  message: string;
  data: T;
  page?: Pagination;
}
export function toApiResponse<T>(
  message: string,
  data?: T,
  page?: Pagination,
): ApiResponse<T> {
  return {
    message,
    data,
    page,
  };
}
