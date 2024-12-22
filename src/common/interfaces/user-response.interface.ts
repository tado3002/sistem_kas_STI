import { Role, User } from '@prisma/client';

export interface UserResponse {
  usernameByNIM: number;
  name: string;
  role: Role;
}
export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    usernameByNIM: user.usernameByNIM,
    role: user.role,
  };
}
