export interface ApiResponse<T> {
  message: string;
  data: T;
}
export function toApiResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    message,
    data,
  };
}
