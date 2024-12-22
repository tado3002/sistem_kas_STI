import { ApiResponse } from './response.interface';

export interface LoginResponse {
  accessToken: string;
}
export interface RegisterResponse {
  name: string;
  usernameByNIM: number;
}
export function toLoginResponse(
  message: string,
  token: string,
): ApiResponse<LoginResponse | null> {
  return {
    message,
    data: {
      accessToken: token,
    },
  };
}

export function toRegisterResponse(
  message: string,
  register: RegisterResponse,
): ApiResponse<RegisterResponse | null> {
  return {
    message,
    data: register,
  };
}
