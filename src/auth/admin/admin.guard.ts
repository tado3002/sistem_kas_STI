import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { toApiResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || user?.role !== 'admin') {
      throw new HttpException(
        toApiResponse('fitur khusus admin!'),
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
