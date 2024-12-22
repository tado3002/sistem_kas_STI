import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { toApiResponse } from '../common/interfaces/response.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    //console.log({
    //  error: err,
    //  user: user,
    //  info: info,
    //  context: context,
    //  status: status,
    //});
    if (info instanceof JsonWebTokenError) {
      throw new HttpException(
        toApiResponse('Token invalid!'),
        HttpStatus.UNAUTHORIZED,
      );
    } else if (info instanceof TokenExpiredError) {
      throw new HttpException(
        toApiResponse('Token kedaluwarsa!'),
        HttpStatus.UNAUTHORIZED,
      );
    } else if (!user) {
      throw new HttpException(
        toApiResponse('Token tidak ditemukan, silahkan login!'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
