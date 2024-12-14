import { ApiResponse } from './response.interface';
import { UserResponse } from './user-response.interface';

export interface LoginResponse {
  accessToken: string | null;
  user: UserResponse | null;
}
export interface RegisterResponse {
  name: string;
  username: string;
}
export function toLoginResponse(
  message: string,
  token: string,
  user: UserResponse,
): ApiResponse<LoginResponse> {
  return {
    message,
    data: {
      accessToken: token,
      user,
    },
  };
}

export function toRegisterResponse(
  message: string,
  register: RegisterResponse,
): ApiResponse<RegisterResponse> {
  return {
    message,
    data: register,
  };
}
