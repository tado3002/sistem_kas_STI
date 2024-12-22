import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { toApiResponse } from '../../common/interfaces/response.interface';
import { UserResponse } from '../../common/interfaces/user-response.interface';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    // mengambil request
    const request = context.switchToHttp().getRequest();

    // mengambil object user dalam requet
    const user: UserResponse = request.user;

    // return exception jika bukan admin
    if (!user || user.role !== Role.admin) {
      throw new HttpException(
        toApiResponse('fitur khusus admin!'),
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
