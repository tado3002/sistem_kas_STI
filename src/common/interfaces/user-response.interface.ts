import { User } from '@prisma/client';

export interface UserResponse {
  id: number;
  username: string;
  name: string;
  role: string;
}
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
  };
}
